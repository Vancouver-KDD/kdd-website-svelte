<script lang="ts">
  import {Toaster} from 'svelte-french-toast'
  import {DateTime} from 'luxon'
  import RefundTicketImage from '$lib/images/refund-ticket.png'
  import RefundTicketSuccess from '$lib/images/ticket-image.png'

  export let data

  const {reservedTicket, event} = data
</script>

<svelte:head>
  <title>Vancouver KDD - MyTicket</title>
</svelte:head>

<Toaster />

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex flex-col md:flex-row gap-8 mt-8">
    <div class="w-full flex flex-col">
      <img class="w-full h-full -mt-4" src={RefundTicketImage} alt="refund-ticket" />
      <div class="-mt-4 pl-2">
        <p class="text-gray-500 text-sm">
          Once you have checked your ticket, click the "Cancel" button, and KDD team will review
          your request. You will receive a confirmation email shortly. If you have any questions or
          need assistance, please contact us at <a
            class="text-royalBlue-600"
            href="mailto:partner@vancouverkdd.com"
            >partner@vancouverkdd.com
          </a>
        </p>
      </div>
    </div>
    <div class="w-full px-8">
      <div class="pt-6 pb-4">
        <h1 class="text-xl font-semibold text-royalBlue-700">My KDD Ticket</h1>
      </div>
      <div class="flex flex-col justify-center h-96 p-4 rounded shadow-lg">
        {#if reservedTicket && reservedTicket.status !== 'cancelled'}
          <form method="POST" class="flex flex-col gap-1">
            <div class="mb-2">
              <img class="w-full h-52" src={event?.poster?.url} alt="event-poster" />
            </div>
            <div class="flex gap-2 text-sm">
              <h1 class="text-gray-700">Event:</h1>
              <h2 class="font-semibold text-gray-700">
                {reservedTicket?.eventName}
              </h2>
            </div>
            <div class="flex gap-2 text-sm">
              <h1 class="text-gray-700">Date:</h1>
              <h2 class="font-semibold text-gray-700">
                {event && DateTime.fromISO(event.date).toFormat('yyyy LLL dd H:mm a')}
              </h2>
            </div>
            <div class="flex gap-1 text-sm">
              <h1 class="text-gray-700">Name:</h1>
              <h2 class="font-semibold text-gray-700">
                {reservedTicket?.name}
              </h2>
            </div>
            <div class="flex gap-1 text-sm">
              <h1 class="text-gray-700">Email:</h1>
              <h3 class="ml-1 text-sm">
                {reservedTicket?.email}
              </h3>
            </div>
            <div class="flex justify-end items-center gap-2">
              <div class="mt-1">
                {#if reservedTicket?.price === '0.00'}
                  <h3 class="text-gray-400 pt-1">Free</h3>
                {:else}
                  <h3 class="text-gray-500 pt-1">
                    ${reservedTicket?.price}
                  </h3>
                {/if}
              </div>
              <button
                type="submit"
                class="border-2 bg-radicalRed-400 text-white px-4 py-2 rounded-lg">Cancel</button>
            </div>
          </form>
        {:else}
          <div class="flex flex-col items-center -mt-16">
            <img class="w-40 opacity-50" src={RefundTicketSuccess} alt="ticket-logo" />
            <h1 class="text-md italic text-gray-500 font-medium -mt-6">You have no ticket yet</h1>
          </div>
        {/if}
      </div>
    </div>
  </div>
</section>
