<script lang="ts">
  import {signOut} from 'firebase/auth'
  import {firebaseAuth} from '$lib/firebase'
  import {authUser} from '$lib/store/authStore'
  import {goto} from '$app/navigation'
  import {Drawer} from '$lib/components'
  import {page} from '$app/stores'
  import {selectedEventId, ticketValue} from '$lib/store/index.js'

  export let data
  const {events} = data

  const handleLogout = () => {
    signOut(firebaseAuth)
      .then(() => {
        $authUser = undefined
        goto('/admin')
      })
      .catch((error) => {
        console.log(error)
      })
  }

  $: _selectedEventId = $page.url.searchParams.get('eventId')
  $: if (_selectedEventId) {
    $selectedEventId = _selectedEventId
  }
</script>

<svelte:head>
  <title>KDD Admin Page</title>
</svelte:head>

<section class="flex flex-col items-center gap-4 p-5 bg-gray-50 h-full relative">
  <div class="w-full flex justify-between p-2 items-center gap-8">
    <h1 class="text-2xl font-semibold text-royalBlue-800">KDD Admin Dashboard</h1>
    <button
      on:click={handleLogout}
      class="border px-4 py-2 rounded-lg bg-radicalRed-400 hover:bg-radicalRed-500 text-white font-semibold"
      >Logout</button>
  </div>
  <div class="w-full h-full">
    {#if events}
      <Drawer {events} ticketValue={$ticketValue} />
    {:else}
      <p class="text-royalBlue-800">No event selected</p>
    {/if}
  </div>
</section>
