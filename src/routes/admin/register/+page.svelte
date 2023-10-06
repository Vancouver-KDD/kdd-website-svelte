<script lang="ts">
  import {goto} from '$app/navigation'
  import {createUserWithEmailAndPassword} from 'firebase/auth'
  import {firebaseAuth} from '$lib/firebase'
  import toast, {Toaster} from 'svelte-french-toast'

  let email: string
  let password: string

  let success: boolean | undefined = undefined

  const register = () => {
    createUserWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast.success('admin 계정이 성공적으로 생성되었습니다')
        goto('/admin')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)

        success = false
        console.log(success)
      })
  }
</script>

<Toaster />

<section class="flex flex-col items-center gap-4 p-10">
  <h1 class="text-xl font-semibold">KDD 운영진 Register</h1>
  <div
    class="max-w-4xl w-full flex-center flex-col justify-between items-center md:flex-row gap-8 border border-gray-200 p-6">
    <form class="mx-auto" on:submit|preventDefault={register}>
      <label for="username">Email:</label>
      <input
        type="text"
        id="username"
        name="username"
        bind:value={email}
        required
        class="border mr-4" />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        name="password"
        bind:value={password}
        required
        class="border mr-4" />

      <button type="submit" class="border bg-royalBlue-500 text-white px-4 py-2 rounded"
        >Register</button>
    </form>
  </div>
</section>
