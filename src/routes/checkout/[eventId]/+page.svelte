<script lang="ts">
  import {applyAction} from '$app/forms'
  import {writable} from 'svelte/store'
  import {DateTime} from 'luxon'
  import {toast} from 'svelte-french-toast'
  import {Marked} from '@ts-stack/markdown'
  import {truncate} from 'lodash'

  Marked.setOptions({
    sanitize: true,
  })

  export let data
  const {event} = data

  const formData = {
    firstTime: '',
    name: '',
    email: '',
    occupation: '',
    work: '',
    location: '',
    message: '',
  }

  $: isFree = event?.price === '0.00'
  const isFreeStore = writable(false)

  let dialog: HTMLDialogElement

  const handleClick = () => {
    dialog?.showModal()
  }

  $: eventTime = event && DateTime.fromISO(event.date)
  $: eventTimeTo = event && DateTime.fromISO(event.date).plus({seconds: event.duration})
</script>

<svelte:head>
  <title>Vancouver KDD - Checkout</title>
</svelte:head>

<section class="flex-center flex-col">
  <div class="max-w-4xl w-full flex flex-col md:flex-row gap-8">
    <div class="w-full flex flex-col p-4 pt-6">
      <img class="w-full h-52" src={event?.poster?.url} alt="event-poster" />
      <div class="grid grid-cols-[100px_1fr] gap-2">
        <h3 class="font-semibold text-lg text-royalBlue-700 tracking-tighter">Date</h3>
        <div class="pt-0.5 text-gray-600">
          {eventTime && eventTime.toLocaleString(DateTime.DATE_FULL)}
        </div>
        <h3 class="font-semibold text-lg text-royalBlue-700 tracking-tighter">Time</h3>
        <div class="pt-0.5 text-gray-600">
          {eventTime && eventTime.toLocaleString(DateTime.TIME_SIMPLE)}
          {eventTimeTo && '- ' + eventTimeTo.toLocaleString(DateTime.TIME_SIMPLE)}
        </div>
        <h3 class="font-semibold text-lg text-royalBlue-700">Location</h3>
        <div class="pt-0.5 text-gray-600">
          {event && event.location}
        </div>
        <h3 class="font-semibold text-lg text-royalBlue-700">Summary</h3>
        <button
          class="pt-0.5 text-left text-sm cursor-pointer text-gray-600 hover:text-royalBlue-800"
          on:click={handleClick}>
          {event && truncate(event.description, {length: 322})}
        </button>
      </div>
    </div>

    <!-- Form Part Starts Here -->
    <div class="w-full flex-center">
      <div class="w-full flex items-center justify-center">
        <div class="w-full p-6">
          <form
            method="POST"
            on:submit|preventDefault={async (e) => {
              const data = new FormData(e.currentTarget)
              const headers = new Headers()
              headers.append('x-prerender-revalidate', '0VkJCrieFXnOIRGqLdqf0VkJCrieFXnOIRGqLdqf')
              const response = await fetch(e.currentTarget.action, {
                method: 'POST',
                headers,
                body: data,
              })
              const result = await response.json()
              applyAction(result)
              toast.success('티켓 예약이 완료되었습니다.')
            }}>
            <input type="text" name="eventId" value={event?.id} aria-hidden="true" class="hidden" />

            <div class="mb-5">
              <h1 class="text-xl text-royalBlue-800 font-semibold animate-bounce">
                {event?.title}
              </h1>
            </div>
            <div class="flex flex-col mb-4">
              <h3 class="text-sm text-gray-700 font-medium">
                KDD 밋업에 처음 참석하시나요? <span class="required">*</span>
              </h3>
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
              <label for="name" class="block text-sm font-medium text-gray-700">
                Full Name: <span class="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                bind:value={formData.name}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="email" class="block text-sm font-medium text-gray-700">
                Email: <span class="required">*</span>
              </label>
              <input
                type="email"
                name="email"
                bind:value={formData.email}
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="occupation" class="block text-sm font-medium text-gray-700">
                Occupation: <span class="required">*</span>
              </label>
              <div class="flex">
                <select
                  name="occupation"
                  bind:value={formData.occupation}
                  required
                  class="w-full mr-2 px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500">
                  <option value="" selected disabled hidden>Select an option</option>
                  <option value="developer">개발자</option>
                  <option value="designer">디자이너</option>
                  <option value="student">학생</option>
                  <option value="other">기타</option>
                </select>
                {#if formData.occupation === 'other'}
                  <input
                    required
                    type="text"
                    name="customOccupation"
                    placeholder="직업을 입력해주세요"
                    class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
                {/if}
              </div>
            </div>

            <div class="mb-4">
              <label for="work" class="block text-sm font-medium text-gray-700">
                Work: <span class="required">*</span>
              </label>
              <input
                type="text"
                name="work"
                bind:value={formData.work}
                required
                placeholder="학교명, 회사명, 프리랜서, 기타"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
            </div>

            <div class="mb-4">
              <label for="work" class="block text-sm font-medium text-gray-700">
                Location: <span class="required">*</span>
              </label>
              <input
                type="text"
                name="location"
                bind:value={formData.location}
                required
                placeholder="다운타운, 밴쿠버, 버나비, 코퀴틀람, 리치몬드, 기타"
                class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
            </div>

            {#if !isFree}
              <div class="mb-4">
                <label for="work" class="flex items-center gap-2">
                  <p class="text-sm font-medium text-gray-700">무료 Tier 조건에 해당하시나요?</p>
                  <p class="text-xs text-gray-500">
                    (아래 중 1개 항목이 충족되면 해당) <span class="required">*</span>
                  </p>
                </label>
                <div class="flex flex-col gap-2 border border-gray-200 rounded-lg p-2">
                  <p class="text-sm text-gray-500">1. 저는 현재 학생입니다</p>
                  <p class="text-sm text-gray-500">2. 저는 현재 구직중입니다</p>
                  <p class="text-sm text-gray-500">3. 저는 KDD 밋업에 처음 참석합니다</p>
                </div>
                <div class="flex gap-4">
                  <span>
                    <input
                      type="radio"
                      id="yes"
                      name="isFreeApplicable"
                      value="Yes"
                      required
                      on:click={() => ($isFreeStore = true)}
                      class="form-radio text-royalBlue-500" />
                    <label for="yes" class="text-sm text-gray-700 font-medium">Yes</label>
                  </span>
                  <span>
                    <input
                      type="radio"
                      id="no"
                      name="isFreeApplicable"
                      value="No"
                      on:click={() => ($isFreeStore = false)}
                      class="form-radio text-royalBlue-500" />
                    <label for="no" class="text-sm text-gray-700 font-medium">No</label>
                  </span>
                </div>
              </div>
            {/if}

            <div class="mb-4">
              <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
              <textarea
                bind:value={formData.message}
                name="message"
                rows="4"
                placeholder="KDD에 하시고 싶으신 말씀이나 건의사항이 있다면 남겨주세요."
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500 text-sm" />
            </div>

            <div class="text-right">
              <button
                type="submit"
                class="px-4 py-2 bg-[#bd2d87]/90 text-white rounded-md hover:bg-[#bd2d87]">
                {#if $isFreeStore}Reserve{:else}Continue to Payment{/if}
              </button>
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:click={() => dialog.close()}
  class="bg-transparent backdrop-blur-sm max-w-full max-h-full min-w-full min-h-full flex items-center justify-center">
  <div class="w-1/2 bg-white rounded-xl shadow-lg p-6">
    <p class="text-sm [&>*]:pb-4">
      {@html Marked.parse(event?.description ?? '')}
    </p>
  </div>
</dialog>

<style lang="sass">
  span.required 
    @apply text-red-500
</style>
