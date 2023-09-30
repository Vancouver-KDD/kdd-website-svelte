<script lang="ts">
  import {DateTime} from 'luxon'
  import {Button} from '$lib/components'
  import {Marked} from '@ts-stack/markdown'

  Marked.setOptions({
    sanitize: true,
  })
  export let event: DB.Event
  let dialog: HTMLDialogElement

  $: isPastEvent = DateTime.fromISO(event.date).diffNow().toMillis() < 0

  let scrollToTopAnchor: HTMLDivElement

  console.log('event', event)
</script>

<button
  on:click={() => {
    dialog?.showModal()
    scrollToTopAnchor?.scrollIntoView()
  }}>
  <div class="w-full rounded-md overflow-clip grid max-md:grid-cols-1 md:grid-cols-2 group">
    <div class="h-full md:max-h-72 overflow-hidden">
      <img
        class="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500"
        src={event.poster?.url}
        alt="event poster" />
    </div>
    <div class="h-full flex-col min-h-40 bg-gray-100 px-5 py-4 gap-3">
      <div>
        <p class="text-base">
          {DateTime.fromISO(event.date).toFormat('yyyy LLL dd H:mm a')}
        </p>
        <p class="text-sm font-medium">{event.location ?? ''}</p>
        <!-- <p class="text-sm font-medium">{event.location ?? ''}</p> -->
      </div>
      <h3 class="text-2xl font-bold line-clamp-1 -mt-1">{event.title ?? ''}</h3>
      <!-- <p class="line-clamp-6 md:line-clamp-4 text-sm"> original code not working in safari -->
      <p class="line-clamp-6-safari text-sm">
        <!-- eslint-disable svelte/no-at-html-tags -->
        {@html Marked.parse(event.description ?? '')}
      </p>
      {#if event.joinLink}
        <Button
          on:click={(e) => e.stopImmediatePropagation()}
          disabled={isPastEvent}
          class="rounded-full"
          href="/checkout">
          {isPastEvent ? 'CLOSED' : 'RSVP'}
        </Button>
      {/if}
    </div>
  </div>
</button>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
  bind:this={dialog}
  on:click={() => dialog.close()}
  class="bg-transparent backdrop-blur-sm max-w-full max-h-full min-w-full min-h-full">
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions-->
  <div class="grid items-center place-items-center max-w-3xl w-full h-screen m-auto">
    <div class="rounded-md overflow-clip" on:click|stopPropagation={() => null}>
      <div class="md:max-h-120">
        <img
          class="w-full object-cover transition-transform duration-500"
          src={event.poster?.url}
          alt="event poster" />
      </div>
      <div class="flex-col min-h-40 max-h-72 overflow-y-auto bg-gray-100 p-6 gap-3">
        <div bind:this={scrollToTopAnchor}>
          <p class="text-base">
            {DateTime.fromISO(event.date).toFormat('yyyy LLL dd H:mm a')}
          </p>
          <p class="font-medium">{event.location ?? ''}</p>
        </div>
        <h3 class="text-2xl font-bold">{event.title ?? ''}</h3>
        <p class="text-sm [&>*]:pb-4">
          <!-- eslint-disable svelte/no-at-html-tags -->
          {@html Marked.parse(event.description ?? '')}
        </p>
        {#if event.joinLink}
          <Button disabled={isPastEvent} class="rounded-full" href={event.joinLink}>
            {isPastEvent ? 'CLOSED' : 'RSVP'}
          </Button>
        {/if}
      </div>
    </div>
  </div>
</dialog>

<style>
  .line-clamp-6-safari {
    display: -webkit-box;
    overflow: hidden;
    /* -webkit-line-clamp: 3; */
    -webkit-box-orient: vertical;
    text-overflow: hidden;
    height: 5rem;
  }

  @media only screen and (max-width: 768px) {
    /* For mobile phones: */
    .line-clamp-6-safari {
      display: -webkit-box;
      overflow: hidden;
      /* -webkit-line-clamp: 3; */
      -webkit-box-orient: vertical;
      text-overflow: hidden;
      height: 7.5rem;
    }
  }

  /* 
  .md\:line-clamp-4-safari {
    height: 1rem;
  } */
</style>
