<script lang="ts">
  import {DateTime} from 'luxon'
  import {Button} from '$lib/components'
  import {Marked} from '@ts-stack/markdown'
  import {createEventAnalyticsStore} from '$lib/store'
  import {onMount} from 'svelte'
  import type {Readable} from 'svelte/store'

  Marked.setOptions({
    sanitize: true,
  })
  export let event: DB.Event
  let dialog: HTMLDialogElement

  $: isPastEvent = DateTime.fromISO(event.date).diffNow().toMillis() < 0

  let scrollToTopAnchor: HTMLDivElement

  let eventAnalyticsStore: Readable<DB.EventAnalytics | null | undefined> | undefined
  onMount(() => {
    eventAnalyticsStore = createEventAnalyticsStore(event.id)
  })

  $: ticketsLeft =
    event.quantity -
    (($eventAnalyticsStore?.ticketsConfirmedCount ?? 0) +
      ($eventAnalyticsStore?.ticketsOnHoldCount ?? 0))
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
      {#if event.id}
        <Button
          on:click={(e) => e.stopImmediatePropagation()}
          disabled={isPastEvent ||
            $eventAnalyticsStore === undefined ||
            (ticketsLeft <= 0 && !event.joinLink) ||
            event.id === 'recmVKh6OgGcv8itV'}
          class="rounded-full"
          href={event.joinLink ? event.joinLink : `/checkout/${event.id}`}>
          {isPastEvent
            ? 'CLOSED'
            : $eventAnalyticsStore === undefined
            ? 'loading...'
            : ticketsLeft < 0 && !event.joinLink
            ? 'SOLD OUT'
            : 'RSVP'}
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
        <h3 class="text-2xl font-bold">{event.title ?? ''}</h3>
        <p class="text-sm [&>*]:pb-4">
          <!-- eslint-disable svelte/no-at-html-tags -->
          {@html Marked.parse(event.description ?? '')}
        </p>
        {#if event.id}
          <Button
            disabled={isPastEvent ||
              $eventAnalyticsStore === undefined ||
              ticketsLeft <= 0 ||
              event.id === 'recmVKh6OgGcv8itV'}
            class="rounded-full"
            href={event.joinLink ? event.joinLink : `/checkout/${event.id}`}>
            {isPastEvent
              ? 'CLOSED'
              : $eventAnalyticsStore === undefined
              ? 'loading...'
              : ticketsLeft > 0
              ? 'RSVP'
              : 'SOLD OUT'}
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
</style>
