<script lang="ts">
  import {signOut} from 'firebase/auth'
  import {firebaseAuth} from '$lib/firebase'
  import {authUser} from '$lib/store/authStore'
  import {goto} from '$app/navigation'
  import Drawer from '$lib/components/Drawer.svelte'
  import {page} from '$app/stores'
  import {getTicketsStore} from '$lib/store/index.js'
  import type {Readable} from 'svelte/store'

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

  $: selectedEventId = $page.url.searchParams.get('eventId')

  let ticketsStore: Readable<DB.Ticket[]>
  $: if (selectedEventId) {
    ticketsStore = getTicketsStore(selectedEventId)
  }
</script>

<svelte:head>
  <title>KDD Admin Page</title>
</svelte:head>

<section class="flex flex-col items-center gap-4 p-5 bg-gray-50 h-full">
  <div class="w-full flex justify-between p-2 items-center gap-8">
    <h1 class="text-2xl font-semibold text-royalBlue-800">KDD Admin Dashboard</h1>
    <button
      on:click={handleLogout}
      class="border px-4 py-2 rounded-lg bg-royalBlue-500 text-white font-semibold">Logout</button>
  </div>
  <div class="w-full h-full">
    {#if events}
      <Drawer {events} {ticketsStore} />
    {:else}
      <p class="text-royalBlue-800">No event selected</p>
    {/if}
  </div>
</section>
