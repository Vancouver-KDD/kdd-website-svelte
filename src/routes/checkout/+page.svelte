<script lang="ts">
  import {CheckoutForm} from '$lib/components'
  import CheckoutImage from '$lib/images/checkout-image.png'
  export let data
  const {events} = data

  console.log('events', events)
</script>

<svelte:head>
  <title>Vancouver KDD - Checkout</title>
</svelte:head>

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex gap-8">
    <div class="w-full flex-center flex-col">
      <img class="w-96 -mt-24" src={CheckoutImage} alt="kdd-logo" />
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
      <CheckoutForm />
    </div>
  </div>
  <div class="p-6">
    <p>
      ** This information is solely for reserving KDD's open events and will not be used for any
      other purpose.
    </p>
  </div>
</section>
