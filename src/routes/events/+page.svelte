<script lang="ts">
  import {EventCard, Section} from '$lib/components'
  import comingSoonPoster from '$lib/images/coming-soon.jpg'
  import {DateTime} from 'luxon'
  export let data
  const {events} = data

  const pastEvents: DB.Event[] = []
  const upcomingEvents: DB.Event[] = []

  events.forEach((event) => {
    if (DateTime.fromISO(event.date).diffNow().toMillis() < 0) {
      pastEvents.push(event)
    } else {
      upcomingEvents.push(event)
    }
  })
</script>

<svelte:head>
  <title>Vancouver KDD - Events 이벤트</title>
</svelte:head>

<div class="flex-col gap-16">
  <Section title="Upcoming Event">
    {#if upcomingEvents?.length > 0}
      {#each upcomingEvents as event}
        <div class="mb-2">
          <EventCard {event} />
        </div>
      {/each}
    {:else}
      <div class="max-h-72 rounded-md overflow-hidden grid max-md:grid-cols-1 md:grid-cols-2">
        <div class="h-full overflow-hidden">
          <img
            class="h-full w-full object-cover hover:scale-110 transition-transform duration-500"
            src={comingSoonPoster}
            alt="event poster" />
        </div>
        <div class="h-full bg-gray-100 p-6 gap-3 flex-center flex-col">
          <h3 class="text-2xl font-bold line-clamp-1">No Upcoming Event</h3>
          <h4 class="text-lg font-medium line-clamp-1">Check Back Soon!</h4>
        </div>
      </div>
    {/if}
  </Section>

  <Section title="Past Events">
    <div class="flex-col gap-20">
      {#each pastEvents as event}
        <EventCard {event} />
      {/each}
    </div>
  </Section>
</div>
