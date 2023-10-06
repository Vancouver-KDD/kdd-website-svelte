import {env} from '$env/dynamic/private'
import {db} from '$lib/server/firebaseAdmin'

export async function createTicket(data: DB.Ticket) {
  // 1. Check if data.id (TicketId) does not already exist
  if ((await db.doc(`Tickets/${data.id}`).get()).exists) {
    throw new Error('Ticket with given ID already exists')
  }

  // 2. Cancel any unpaid tickets for the same event
  const sameEventsSnap = await db
    .collection('Tickets')
    .where('eventId', '==', data.eventId)
    .where('email', '==', data.email)
    .where('status', '==', 'unpaid')
    .get()
  const batch = db.batch()
  for (const doc of sameEventsSnap.docs) {
    batch.update(doc.ref, {
      status: 'cancelled',
    })
  }
  await batch.commit()

  // 3. Create New Ticket
  await db.doc(`Tickets/${data.id}`).set({
    ...data,
    createdAt: new Date(),
  })
  return true
}

export async function cancelTicket(ticketId: string) {
  const ticketData = (await db.doc(`Tickets/${ticketId}`).get()).data() as DB.Ticket
  if (ticketData.status === 'cancelled') {
    throw new Error('Ticket already cancelled')
  }

  await db.doc(`Tickets/${ticketId}`).update({
    status: 'cancelled',
  } satisfies Partial<DB.Ticket>)

  return true
}

export async function updateTicketAsPaid(ticketId: string) {
  const ticketData = (await db.doc(`Tickets/${ticketId}`).get()).data() as DB.Ticket

  if (ticketData.status !== 'unpaid') {
    throw new Error('Ticket must be unpaid. Currently ticket is ' + ticketData.status)
  }

  await db.doc(`Tickets/${ticketId}`).update({
    status: 'paid',
  } satisfies Partial<DB.Ticket>)

  return true
}

export async function handleKofiWebhook(data: App.KoFiWebhookData) {
  const {verification_token, email, amount, currency, kofi_transaction_id, url} = data
  if (verification_token !== env.KOFI_VERIFICATION_TOKEN) {
    throw new Error('Invalid verificationToken')
  }

  await db.runTransaction(async (transaction) => {
    // 1. Ensure kofiTransaction is not already handled
    const kofiTransactionSnap = await transaction.get(
      db.doc(`KoFiTransactions/${kofi_transaction_id}`)
    )
    if (kofiTransactionSnap.exists) {
      return
    }

    // 2. Fetch all unpaid tickets with same email
    const ticketsSnap = await transaction.get(
      db.collection('Tickets').where('email', '==', email).where('status', '==', 'unpaid')
    )

    const ticketSnap = ticketsSnap.docs[0]
    const ticketData = (ticketSnap?.data() as DB.Ticket) ?? {}

    // 3. If ticketPrice is same as KoFi Donation amount, save KofiTransaction and update ticket status to paid, send email to user.
    if (ticketData.price === amount && ticketData.currency === currency) {
      await transaction.set(db.doc(`KoFiTransactions/${kofi_transaction_id}`), {
        ...data,
        ticketId: ticketSnap.id,
      })

      await transaction.update(ticketSnap.ref, {
        status: 'paid',
        koFiTransactionId: kofi_transaction_id,
      })

      await transaction.create(db.collection('Email').doc(), {
        to: email,
        subject: `Purchase Complete for ${ticketData.eventName}`,
        text: `Congratulations, we received payment ${data.amount}.
See you at ${ticketData.eventName}!
To request refund goto https://vancouverkdd.com/refundTicket?ticketId=${ticketData.id}`,
      })
    } else {
      // 4. If ticketPrice does not match, just save KoFiTransaction only, send warning email to admin
      await transaction.set(db.doc(`KoFiTransactions/${kofi_transaction_id}`), {
        ...data,
        ticketId: null,
      })

      await transaction.create(db.collection('Email').doc(), {
        to: 'vancouverkdd@gmail.com',
        subject: '[WARN] KoFi Donation without Unpaid Ticket',
        text: `KoFi Transaction ${url} was received but could not find any ticket that is unpaid under email ${email}!`,
      })
    }
  })

  return true
}

export async function refundTicket(ticketId: string) {
  if (!ticketId) {
    throw new Error('missing ticketId')
  }

  const ticketData = (await db.doc(`Tickets/${ticketId}`).get()).data() as DB.Ticket
  if (!ticketData) {
    throw new Error('Cannot find Ticket with id ' + ticketId)
  }

  if (ticketData.status === 'cancelled') {
    throw new Error('Ticket already cancelled')
  }

  const batch = db.batch()
  batch.update(db.doc(`Tickets/${ticketId}`), {
    status: 'cancelled',
  })

  if (ticketData.status === 'paid') {
    batch.create(db.collection('Email').doc(), {
      to: 'vancouverkdd@gmail.com',
      subject: `[Action Required] Ticket Cancelled: ${ticketData.email} ${ticketData.eventName}`,
      text: `Ticket cancelled for ${ticketData.email}.
Please refund ${ticketData.price} back`,
    })
  } else {
    batch.create(db.collection('Email').doc(), {
      to: 'vancouverkdd@gmail.com',
      subject: `Ticket Cancelled: ${ticketData.email} ${ticketData.eventName}`,
      text: `Ticket cancelled for ${ticketData.email}.`,
    })
    return batch.commit()
  }
}

type EmailParams = {
  to: string
  subject: string
  templateId?: string
  templateData?: unknown
  html?: string
  text?: string
}

export async function sendEmail(params: EmailParams) {
  const {to, subject} = params

  return db.collection('Email').add({
    to,
    subject,
    ...(params.templateId ? {name: params.templateId, data: params.templateData ?? {}} : {}),
    ...(params.html ? {html: params.html} : {}),
    ...(params.text ? {text: params.text} : {}),
  })
}
