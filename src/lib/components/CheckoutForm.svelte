<script lang="ts">
  export let isOpen = false
  let name = ''
  let email = ''
  let occupation = ''
  let work = ''
  let message = ''

  function handleSubmit() {
    console.log('Name:', name)
    console.log('Email:', email)
    console.log('Occupation:', occupation)
    console.log('Work:', work)
    console.log('Message:', message)
  }
</script>

<div class="w-full flex items-center justify-center">
  <div class="w-full p-6">
    <form on:submit={handleSubmit}>
      <div class="mb-4">
        <label for="name" class="block text-sm font-medium text-gray-700">Name:</label>
        <input
          type="text"
          id="name"
          bind:value={name}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="email" class="block text-sm font-medium text-gray-700">Email:</label>
        <input
          type="email"
          id="email"
          bind:value={email}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="occupation" class="block text-sm font-medium text-gray-700">Occupation:</label>
        <input
          type="text"
          id="occupation"
          bind:value={occupation}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="work" class="block text-sm font-medium text-gray-700">Work:</label>
        <input
          type="text"
          id="work"
          bind:value={work}
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500" />
      </div>

      <div class="mb-4">
        <label for="message" class="block text-sm font-medium text-gray-700">Message:</label>
        <textarea
          id="message"
          bind:value={message}
          rows="4"
          required
          class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-royalBlue-500"
        ></textarea>
      </div>

      <div class="text-right">
        <button
          type="submit"
          class="px-4 py-2 bg-[#794bc4] text-white rounded-md hover:bg-royalBlue-500"
          >Submit</button>
      </div>
    </form>
  </div>
</div>
