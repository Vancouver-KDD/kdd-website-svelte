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
        goto('/admin/login')
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

<section class="flex flex-col items-center gap-4 p-10 bg-gray-50 h-full">
  <div class="w-full flex justify-between items-center gap-8 p-4">
    <h1 class="text-xl font-semibold">KDD Admin Dashboard</h1>
    <button
      on:click={handleLogout}
      class="border px-4 py-2 rounded-lg bg-royalBlue-500 text-white font-semibold">Logout</button>
  </div>
  <div class="w-full h-full">
    {#each events as event (event.id)}
      <div>
        {event.id}
        <button on:click={() => goto(`/admin/dashboard?eventId=${event.id}`)}>{event.title}</button>
      </div>
    {/each}
    {#if ticketsStore}
      {#each $ticketsStore as ticket (ticket.id)}
        Email: {ticket.email}
      {/each}
    {/if}
    <!-- <Drawer {tickets} /> -->
  </div>
</section>
