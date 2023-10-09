<script lang="ts">
  import {page} from '$app/stores'
  import {db} from '$lib/firebase'
  import CheckoutImage from '$lib/images/checkout-image.png'
  import {doc, onSnapshot} from 'firebase/firestore'
  import {onMount} from 'svelte'

  const ticketId = $page.url.searchParams.get('ticketId')

  let ticketData: DB.Ticket | undefined
  onMount(() => {
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
    <div class="w-full flex-center flex-col">
      <div id="event-price">$ 13</div>
      <img class="w-96 -mt-24 -ml-2" src={CheckoutImage} alt="kdd-logo" />
      <div class="">
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
        Success
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
