<script lang="ts">
  import {page} from '$app/stores'
  import {db} from '$lib/firebase'
  import CheckoutImage from '$lib/images/checkout-image.png'
  import {doc, onSnapshot} from 'firebase/firestore'
  import {onMount} from 'svelte'
  import {Redirect} from '$lib/components'

  let ticketData: DB.Ticket | undefined
  onMount(() => {
    const ticketId = $page.url.searchParams.get('ticketId')
    return onSnapshot(doc(db, `Tickets/${ticketId}`), (snap) => {
      ticketData = snap.data() as DB.Ticket
    })
  })
</script>

<svelte:head>
  <title>Vancouver KDD - Checkout</title>
</svelte:head>

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex gap-8">
    <div class="w-full flex flex-col items-center pt-8">
      <img class="w-96" src={CheckoutImage} alt="kdd-logo" />
      <div class="mt-2">
        <p class="text-center -mt-8 p-3 rounded-xl bg-royalBlue-500 text-white">
          KDD의 특별한 일정을 놓치지 마세요. <br />
          다음 이벤트를 위한 자리를 지금 예약하세요! <br />
        </p>
        <p class="text-center mt-1">
          Let's make your next event extra special<br />
          Reserve your spot today!
        </p>
      </div>
    </div>
    <div class="w-full flex-center">
      {#if ticketData === undefined}
        Loading...
      {:else if ticketData.status === 'unpaid'}
        <iframe
          id="kofiframe"
          src="https://ko-fi.com/vancouverkdd/?hidefeed=true&widget=true&embed=true&preview=true"
          style="border:none;width:100%;padding:4px;background:#f9f9f9;"
          height="712"
          title="vancouverkdd"></iframe>
      {:else if ticketData.status === 'paid'}
        <Redirect href={`/myTicket?ticketId=${ticketData.id}`} />
        <!-- <div class="flex flex-col h-[700px] w-full items-center mt-28">
          <img class="w-48 opacity-80" src={TicketImage} alt="ticket" />
          <p class="font-semibold text-center -mt-4">
            You're ready to roll! <br /> Your ticket is headed to your email.
          </p>
          <p class="text-xs mt-1">결재가 완료되었습니다. 이벤트 확정 이메일이 발송될 예정입니다.</p>
        </div>
        <div class="confetti-wrapper">
          <Confetti
            x={[-5, 5]}
            y={[0, 0.1]}
            delay={[500, 2000]}
            infinite
            duration={3000}
            amount={150}
            fallDistance="100vh" />
        </div> -->
      {/if}
    </div>
  </div>
  <div class="p-6">
    <p>
      ** This information is solely for reserving KDD's open events and will not be used for any
      other purpose.
    </p>
  </div>
</section>

<style>
  /* .confetti-wrapper {
    position: fixed;
    top: -50px;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    overflow: hidden;
    pointer-events: none;
  } */
</style>
