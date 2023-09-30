<script lang="ts">
  import {CheckoutForm} from '$lib/components'
  import CheckoutImage from '$lib/images/checkout-image.png'
  import {page} from '$app/stores'
  import {DateTime} from 'luxon'

  export let data
  const {events} = data

  const pageUrl = new URL($page.url)
  const pathnameParts = pageUrl.pathname.split('/')
  const eventId = pathnameParts[pathnameParts.length - 1]

  const checkoutEvent = events.find((event) => event.id === eventId)
  console.log('checkoutEvent', checkoutEvent)

  function limit(string = '', limit = 0) {
    return string.substring(0, limit)
  }
</script>

<svelte:head>
  <title>Vancouver KDD - Checkout</title>
</svelte:head>

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex flex-col md:flex-row gap-8">
    <div class="w-full flex flex-col p-4 pt-6">
      <img class="w-full h-52" src={checkoutEvent?.poster?.url} alt="event-poster" />
      <div class="mt-2">
        <div class="grid grid-cols-4 mt-4">
          <h3 class="font-semibold text-lg text-royalBlue-700 tracking-tighter">Date & Time</h3>
          <div class="col-span-3 px-2 text-gray-600">
            {checkoutEvent && DateTime.fromISO(checkoutEvent.date).toFormat('yyyy LLL dd H:mm a')}
          </div>
        </div>
        <div class="grid grid-cols-4 mt-2">
          <h3 class="font-semibold text-lg text-royalBlue-700">Location</h3>
          <div class="col-span-3 px-2 text-gray-600">
            {checkoutEvent && checkoutEvent.location}
          </div>
        </div>
        <div class="grid grid-cols-4 mt-2">
          <h3 class="font-semibold text-lg text-royalBlue-700">Summary</h3>
          <div class="col-span-3 px-2 text-gray-500 text-sm">
            {checkoutEvent && limit(checkoutEvent.description, 190)}[...]
          </div>
        </div>
      </div>
    </div>
    <div class="w-full flex-center">
      <CheckoutForm {checkoutEvent} />
    </div>
  </div>
  <div class="mt-24">
    <p>
      ** This information is solely for reserving KDD's open events and will not be used for any
      other purpose.
    </p>
  </div>
</section>
