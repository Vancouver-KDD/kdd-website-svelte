<script lang="ts">
  import {Section} from '$lib/components'
  import {Marked} from '@ts-stack/markdown'
  Marked.setOptions({sanitize: true})

  import {DateTime} from 'luxon'

  export let data
  let dialog: HTMLDialogElement

  function stringToTime(text: string | void) {
    if (!text) {
      return 0
    }
    const words = text.length / 5.7 // 4.7 avg characters per word + space
    const minutes = words / 120 // 120 average words per minute
    return Math.ceil(minutes)
  }

  let blog: DB.Blog | null = null
  $: if (blog) {
    dialog.showModal()
  }
</script>

<svelte:head>
  <title>Vancouver KDD - Blogs 블로그</title>
</svelte:head>

<Section title="Blogs">
  <div class="grid gap-10">
    {#each data.blogs as _blog}
      <button on:click={() => (blog = _blog)} class="relative isolate overflow-hidden">
        <!-- Prevent <a> links to activate along with dialog -->
        <div class="absolute inset-0 bg-white opacity-0 z-10" />
        <p class="line-clamp-1 text-gray-800 text-xl font-bold">
          {_blog.title ?? ''}
        </p>
        <p class="line-clamp-4 text-gray-500 text-base my-2">
          <!-- eslint-disable svelte/no-at-html-tags -->
          {@html Marked.parse(_blog.description ?? '', {sanitize: true})}
        </p>
        <span class="text-sm text-gray-500">
          {DateTime.fromISO(_blog.date).toFormat('LLL dd')} ·
          {stringToTime(_blog.description)} min read ·
          {#if _blog.author}By <span class="font-medium">{_blog.author.name}</span>{/if}
        </span>
      </button>
    {/each}
  </div>
</Section>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:close={() => (blog = null)}
  on:click={() => dialog.close()}
  class="bg-transparent backdrop-blur-sm max-w-full max-h-full min-w-full min-h-full">
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions-->
  {#if blog}
    <div class="grid items-center place-items-center max-w-5xl w-full h-screen m-auto">
      <div class="rounded-md overflow-clip" on:click|stopPropagation={() => null}>
        <div class="flex-col max-h-screen overflow-y-auto bg-white p-6 gap-3">
          <h3 class="text-4xl font-bold text-gray-900">{blog.title ?? ''}</h3>
          <span class="text-base text-gray-500">
            {DateTime.fromISO(blog.date).toFormat('LLL dd')} ·
            {stringToTime(blog.description)} min read ·
            {#if blog.author}By <span class="font-medium">{blog.author.name}</span>{/if}
          </span>
          <p class="text-lg text-gray-800 [&>*]:pb-4">
            <!-- eslint-disable svelte/no-at-html-tags -->
            {@html Marked.parse(blog.description ?? '', {sanitize: true})}
          </p>
        </div>
      </div>
    </div>
  {/if}
</dialog>

<style lang="sass">
  button
    @apply text-start
</style>
