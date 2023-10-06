<script lang="ts">
  import {signOut} from 'firebase/auth'
  import {firebaseAuth} from '$lib/firebase'
  import {authUser} from '$lib/store/authStore'
  import {goto} from '$app/navigation'
  import Drawer from '$lib/components/Drawer.svelte'

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
</script>

<svelte:head>
  <title>KDD Admin Page</title>
</svelte:head>

<section class="flex flex-col items-center gap-4 p-10">
  <div class="w-full flex justify-between items-center gap-8 p-4">
    <h1 class="text-xl font-semibold">KDD Admin Dashboard</h1>
    <button
      on:click={handleLogout}
      class="border px-4 py-2 rounded-lg bg-royalBlue-500 text-white font-semibold">Logout</button>
  </div>
  <div class="w-full">
    <Drawer />
  </div>
</section>
