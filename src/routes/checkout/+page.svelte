<script lang="ts">
  import {CheckoutForm} from '$lib/components'
  import {page} from '$app/stores'
  import {goto} from '$app/navigation'
  import {enhance} from '$app/forms'
  import {DateTime} from 'luxon'
  import {Toaster, toast} from 'svelte-french-toast'
  import {Timestamp} from 'firebase/firestore'

  export let data

  const {events} = data
  const eventId = $page.url.searchParams.get('eventId')
  const checkoutEvent = events?.find((event) => event.id === eventId)

  function limit(string = '', limit = 0) {
    return string.substring(0, limit)
  }

  let formData: DB.Ticket = {
    id: '',
    createdAt: '',
    eventId: '',
    eventName: '',
    price: '',
    firstTime: '',
    name: '',
    email: '',
    occupation: '',
    work: '',
    location: '',
    message: '',
  }

  let success = false

  // $: {
  //   if (formData) {
  //     success = true
  //     setTimeout(() => {
  //       success = false
  //       toast.success('이벤트에 성공적으로 신청되었습니다')
  //       goto('/events')
  //     }, 3000)
  //   }
  // }

  let isEventFree = true
</script>

<svelte:head>
  <title>Vancouver KDD - Checkout</title>
</svelte:head>

<Toaster />

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
            {checkoutEvent && limit(checkoutEvent.description, 320)} [...]
          </div>
        </div>
      </div>
    </div>

    <!-- Form Part Starts Here -->
    <div class="w-full flex-center">
      <div class="w-full flex items-center justify-center">
        <div class="w-full p-6">
          <form
            method="POST"
            use:enhance={({formData}) => {
              if (checkoutEvent) {
                formData.append('createdAt', new Date().toISOString())
                formData.append('eventId', checkoutEvent.id)
                formData.append('eventName', checkoutEvent.title)
                formData.append('price', '0.00') // Free event for now
              }
            }}>
            <div class="mb-5">
              <h1 class="text-xl text-royalBlue-800 font-semibold animate-bounce">
                {checkoutEvent?.title}
              </h1>
            </div>
            <div class="flex gap-6 mb-4">
              <h3 class="text-sm text-gray-700 font-medium">** KDD 밋업에 처음 참석하시나요?</h3>
              <div class="flex items-center gap-5">
                <span>
                  <input
                    type="radio"
                    name="firstTime"
                    bind:group={formData.firstTime}
                    value="Yes"
                    required
                    class="form-radio text-royalBlue-500" />
                  <label for="yes" class="text-sm text-gray-700 font-medium">Yes</label>
                </span>
                <span>
                  <input
                    type="radio"
                    name="firstTime"
                    bind:group={formData.firstTime}
                    value="No"
                    class="form-radio text-royalBlue-500" />
                  <label for="no" class="text-sm text-gray-700 font-medium">No</label></span>
              </div>
            </div>

            <div class="mb-4">
              <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
              <input
                type="text"
                name="name"
                bind:value={formData.name}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
              <input
                type="email"
                name="email"
                bind:value={formData.email}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="occupation" class="block text-sm font-medium text-gray-700"
                >Occupation:</label>
              <input
                type="text"
                name="occupation"
                bind:value={formData.occupation}
                required
                placeholder="학생, 개발자, 디자이너, 기타"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="work" class="block text-sm font-medium text-gray-700">Work:</label>
              <input
                type="text"
                name="work"
                bind:value={formData.work}
                required
                placeholder="학교, 회사, 기타"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="work" class="block text-sm font-medium text-gray-700">Location:</label>
              <input
                type="text"
                name="location"
                bind:value={formData.location}
                required
                placeholder="다운타운, 밴쿠버, 버나비, 코퀴틀람, 리치몬드, 기타"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
            </div>

            <!-- <div class="mb-4">
        <label for="work" class="block text-sm font-medium text-gray-700"
          >무료 Tire 조건 (아래 중 한가지에 해당하면 됩니다)</label>
        <div class="flex flex-col gap-2 border border-gray-200 rounded-lg p-2">
          <p class="text-sm text-gray-500">1. 저는 현재 학생입니다</p>
          <p class="text-sm text-gray-500">2. 저는 현재 구직중입니다</p>
          <p class="text-sm text-gray-500">3. 저는 KDD 밋업에 처음 참석합니다</p>
        </div>
        <div></div>
        <h3 class="text-sm text-gray-700 font-medium">** KDD 밋업에 처음 참석하시나요?</h3>
        <div>
          <span>
            <input
              type="radio"
              id="yes"
              name="attendance"
              value="Yes"
              bind:group={firstTime}
              required
              class="form-radio text-royalBlue-500" />
            <label for="yes" class="text-sm text-gray-700 font-medium">Yes</label>
          </span>
          <span>
            <input
              type="radio"
              id="no"
              name="attendance"
              value="No"
              bind:group={firstTime}
              class="form-radio text-royalBlue-500" />
            <label for="no" class="text-sm text-gray-700 font-medium">No</label>
          </span>
        </div>
      </div> -->

            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
              <textarea
                name="message"
                bind:value={formData.message}
                rows="4"
                placeholder="KDD에 하시고 싶으신 말씀이나 건의사항이 있다면 남겨주세요."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500 text-sm"
              ></textarea>
            </div>

            <div class="text-right">
              {#if !isEventFree}
                <button
                  type="submit"
                  class="px-4 py-2 bg-[#bd2d87]/90 text-white rounded-md hover:bg-[#bd2d87]"
                  >Next</button>
              {:else}
                <button
                  type="submit"
                  class="px-4 py-2 bg-[#bd2d87]/90 text-white rounded-md hover:bg-[#bd2d87]"
                  >Reserve</button>
              {/if}
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
  <div class="mt-24 mb-4">
    <p class="text-xs md:text-sm">
      ** This information is solely for reserving KDD's open events and will not be used for any
      other purpose.
    </p>
  </div>
</section>
