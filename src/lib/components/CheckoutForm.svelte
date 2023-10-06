<script lang="ts">
  // import {saveFormData} from '$lib/api/firebase'
  import {Toaster} from 'svelte-french-toast'

  export let checkoutEvent: DB.Event

  // let timestamp = ''
  let firstTime = ''
  let name = ''
  let email = ''
  let occupation = ''
  let work = ''
  let location = ''
  let message = ''

  function handleSubmit() {
    // const formData = {
    //   timestamp: new Date().toISOString(),
    //   firstTime,
    //   name,
    //   email,
    //   occupation,
    //   work,
    //   location,
    //   message,
    // }
    // function redirectToSuccessPage() {
    //   const successUrl = isEventFree ? '/events' : '/checkout/payment'
    //   window.location.href = successUrl
    // }
    // saveFormData(formData)
    //   .then(() => {
    //     toast.success('이벤트에 성공적으로 신청되었습니다')
    //     redirectToSuccessPage()
    //   })
    //   .catch((error) => {
    //     toast.error('오류 발생! 다시 시도해주세요')
    //     console.error('Error saving form data:', error)
    //   })
  }

  let isEventFree = false
</script>

<Toaster />

<div class="w-full flex items-center justify-center">
  <div class="w-full p-6">
    <form on:submit={handleSubmit}>
      <div class="mb-5">
        <h1 class="text-xl text-royalBlue-800 font-semibold animate-bounce">
          {checkoutEvent.title}
        </h1>
      </div>

      <div class="flex gap-6 mb-4">
        <h3 class="text-sm text-gray-700 font-medium">** KDD 밋업에 처음 참석하시나요?</h3>
        <div class="flex items-center gap-5">
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
            <label for="no" class="text-sm text-gray-700 font-medium">No</label></span>
        </div>
      </div>

      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="occupation" class="block text-sm font-medium text-gray-700">Occupation:</label>
        <input
          type="text"
          id="occupation"
          bind:value={occupation}
          required
          placeholder="학생, 개발자, 디자이너, 기타"
          class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="work" class="block text-sm font-medium text-gray-700">Work:</label>
        <input
          type="text"
          id="work"
          bind:value={work}
          required
          placeholder="학교, 회사, 기타"
          class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="work" class="block text-sm font-medium text-gray-700">Location:</label>
        <input
          type="text"
          id="work"
          bind:value={location}
          required
          placeholder="다운타운, 밴쿠버, 버나비, 코퀴틀람, 리치몬드, 기타"
          class="w-full px-3 py-2 border border-gray-300 text-sm rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
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
      </div>

      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
        <textarea
          id="message"
          bind:value={message}
          rows="4"
          placeholder="KDD에 하시고 싶으신 말씀이나 건의사항이 있다면 남겨주세요."
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500 text-sm"
        ></textarea>
      </div>

      <div class="text-right">
        {#if !isEventFree}
          <button
            type="submit"
            class="px-4 py-2 bg-[#bd2d87]/90 text-white rounded-md hover:bg-[#bd2d87]">Next</button>
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
