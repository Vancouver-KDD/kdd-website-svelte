<script lang="ts">
  import {firebaseAuth} from '$lib/firebase'
  import {signInWithEmailAndPassword} from 'firebase/auth'
  import toast, {Toaster} from 'svelte-french-toast'
  import adminLoginLogo from '$lib/images/admin-login-logo.jpg'
  import {goto} from '$app/navigation'

  let email: string
  let password: string

  const login = () => {
    signInWithEmailAndPassword(firebaseAuth, email, password)
      .then(() => {
        toast.success('admin 계정으로 로그인되었습니다')
        goto('/admin/dashboard')
      })
      .catch((error) => {
        const errorCode = error.code
        const errorMessage = error.message
        console.log(errorCode, errorMessage)
      })
  }
</script>

<Toaster />

<svelte:head>
  <title>KDD Admin Login</title>
</svelte:head>

<section class="flex flex-col items-center gap-4 p-20">
  <div class="">
    <img class="w-full h-52 rounded-full shadow-lgz" src={adminLoginLogo} alt="admin-logo" />
  </div>
  <h1 class="text-xl font-semibold">KDD 운영진 로그인</h1>
  <div
    class="max-w-4xl w-full flex-center flex-col justify-between items-center md:flex-row gap-8 border border-gray-200 p-6">
    <form class="mx-auto" method="POST" on:submit|preventDefault={login}>
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
        placeholder=" 6글자 이상"
        bind:value={password}
        required
        class="border mr-4" />

      <button type="submit" class="border bg-royalBlue-500 text-white px-4 py-2 rounded"
        >Log in</button>
    </form>
  </div>
  <div class="flex gap-2">
    <p class="text-center">아직 계정이 없으신가요?</p>
    <a href="/admin/register" class="text-center text-royalBlue-500">운영진 등록</a>
  </div>
</section>
