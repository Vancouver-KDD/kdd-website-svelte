<script lang="ts">
  import Drawer, {AppContent, Content} from '@smui/drawer'
  import List, {Item, Text} from '@smui/list'
  import {goto} from '$app/navigation'
  import {AdminTable} from './index'
  import {selectedEventId} from '$lib/store'
  import {twMerge} from 'tailwind-merge'
  export let events: DB.Event[]
  export let ticketValue: Map<string, DB.Ticket>
</script>

<div class="flex flex-col md:flex-row h-full">
  <Drawer class="md:w-80 max-h-screen">
    <Content class="h-full">
      <List
        class="flex-start flex-row md:flex-col gap-2 p-1 md:p-2 bg-gray-50 h-full overflow-auto">
        {#each events as event}
          <button on:click={() => goto(`/admin/dashboard?eventId=${event.id}`)}>
            <Item
              id="event-title"
              class={twMerge(
                'w-60 line-clamp-1 md:w-full flex p-2 cursor-pointer bg-gray-100 text-gray-500/80 hover:bg-gray-300 ease-in-out duration-200 rounded font-semibold',
                event.id === $selectedEventId && 'bg-gray-300 text-gray-900 font-semibold'
              )}>
              <Text class="text-start text-sm md:text-base">{event.title}</Text>
            </Item>
          </button>
        {/each}
      </List>
    </Content>
  </Drawer>

  <AppContent class="flex-auto pb-8">
    <main class="h-full w-full">
      <List class="flex-start flex-col gap-1 h-full horizontal-overflow-auto w-[150%] p-2">
        {#if ticketValue && ticketValue.size > 0}
          <AdminTable {events} />
        {:else}
          <p class="m-auto text-royalBlue-800">해당 이벤트에 대한 참여명부가 없습니다.</p>
        {/if}
      </List>
    </main>
  </AppContent>
</div>
