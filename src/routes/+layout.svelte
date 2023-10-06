<script lang="ts">
  import '../app.sass'
  import clsx from 'clsx'
  import kddLogo1 from '$lib/images/logo_kr_white_horizontal.svg'
  import kddLogo2 from '$lib/images/logo_kr_color_horizontal.png'
  import {page} from '$app/stores'
  $: isHome = $page.url.pathname === '/'
  $: isFooterVisible = $page.url.pathname.includes('checkout' || 'admin') === false
  $: isHeaderVisible = $page.url.pathname.includes('admin') === false

  import type {LayoutServerData} from './$types'
  export let data: LayoutServerData
  const {developers, supporters} = data
</script>

{#if isHeaderVisible}
  <nav
    class={clsx(
      'z-30 m-auto max-w-4xl flex items-center flex-col-reverse sm:flex-row justify-between p-4 pt-10',
      isHome && 'absolute inset-x-0'
    )}>
    <a href="/" class="w-36"><img src={isHome ? kddLogo1 : kddLogo2} alt="kdd logo" /></a>
    <div class="{'flex-row gap-6 font-bold [&>a]:p-2 '}{isHome ? 'text-white' : 'text-black'}">
      <a href="/about">About Us</a>
      <a href="/blogs">Blogs</a>
      <a href="/events">Events</a>
      <a href="/photos">Photos</a>
    </div>
  </nav>
{/if}
<slot />
{#if isFooterVisible}
  <footer class="p-8 flex-col items-center gap-2">
    <span class="font-bold text-xl">Developed by</span>
    <div class="max-w-4xl">
      {#each developers as developer}
        <a
          class={clsx('mx-1', developer.link && 'font-medium')}
          href={developer.link}
          target="_blank">
          {developer.name}
        </a>
      {/each}
    </div>
    <span class="font-bold text-xl">Special thanks to</span>
    <div class="max-w-4xl">
      {#each supporters as supporter}
        <a
          class={clsx('mx-1', supporter.link && 'font-medium')}
          href={supporter.link}
          target="_blank">
          {supporter.name}
        </a>
      {/each}
    </div>
  </footer>
{/if}
