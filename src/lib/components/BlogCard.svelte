<script lang="ts">
  import {DateTime} from 'luxon'
  import {Marked} from '@ts-stack/markdown'

  Marked.setOptions({sanitize: true})
  export let blog: DB.Blog
  let dialog: HTMLDialogElement
</script>

<button on:click={() => dialog?.showModal()}>
  <div class="w-full rounded-md overflow-clip grid max-md:grid-cols-1 md:grid-cols-2 group">
    <div class="h-full flex-col min-h-40 bg-gray-100 p-6 gap-3">
      <div>
        <p class="text-base">
          {DateTime.fromISO(blog.date).toFormat('yyyy LLL dd H:mm a')}
        </p>
      </div>
      <h3 class="text-2xl font-bold line-clamp-1">{blog.title ?? ''}</h3>
      <!-- <p class="line-clamp-6 md:line-clamp-4 text-sm"> original code not working in safari -->
      <p class="line-clamp-6-safari text-sm">
        {@html Marked.parse(blog.description ?? '')}
      </p>
    </div>
  </div>
</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:click={() => dialog.close()}
  class="bg-transparent backdrop-blur-sm max-w-full max-h-full min-w-full min-h-full">
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions-->
  <div
    class="grid items-center place-items-center max-w-3xl w-full h-screen m-auto"
    on:click|stopPropagation={() => null}>
    <div class="rounded-md overflow-clip">
      <div class="flex-col min-h-40 max-h-72 overflow-y-auto bg-gray-100 p-6 gap-3">
        <div>
          <p class="text-base">
            {DateTime.fromISO(blog.date).toFormat('yyyy LLL dd H:mm a')}
          </p>
        </div>
        <h3 class="text-2xl font-bold line-clamp-1">{blog.title ?? ''}</h3>
        <p class="text-sm">
          {@html Marked.parse(blog.description ?? '')}
        </p>
      </div>
    </div>
  </div>
</dialog>
