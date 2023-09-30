<script lang="ts">
  import {saveFormData} from '$lib/api/firebase'
  import toast, {Toaster} from 'svelte-french-toast'

  export let checkoutEvent: any

  export let isOpen = false
  let name = ''
  let email = ''
  let occupation = ''
  let work = ''
  let message = ''

  function handleSubmit() {
    const formData = {
      name,
      email,
      occupation,
      work,
      message,
    }

    saveFormData(formData)
      .then(() => {
        toast.success('이벤트에 성공적으로 신청되었습니다')
        // window.location.href = '/'
      })
      .catch((error) => {
        toast.error('오류 발생! 다시 시도해주세요')
        console.error('Error saving form data:', error)
      })
  }
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
        <button
          type="submit"
          class="px-4 py-2 bg-royalBlue-500 text-white rounded-md hover:bg-[#794bc4]"
          >Submit</button>
      </div>
    </form>
  </div>
</div>
