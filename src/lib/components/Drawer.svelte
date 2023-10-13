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

<div class="flex h-full border">
  <Drawer class="w-80 max-h-screen">
    <Content class="h-full">
      <List class="flex-start flex-col gap-2 p-2 border bg-gray-50 h-full overflow-y-auto">
        {#each events as event}
          <button on:click={() => goto(`/admin/dashboard?eventId=${event.id}`)}>
            <Item
              id="event-title"
              class={twMerge(
                'flex p-2 cursor-pointer bg-gray-100 hover:bg-gray-300 ease-in-out duration-200 rounded hover:font-semibold',
                event.id === $selectedEventId && 'bg-gray-300 font-semibold'
              )}>
              <Text class="text-start">{event.title}</Text>
            </Item>
          </button>
        {/each}
      </List>
    </Content>
  </Drawer>

  <AppContent class="w-full flex-auto overflow-auto">
    <main class="h-full">
      <List class="flex-start flex-col gap-1 border h-full overflow-auto p-2">
        {#if ticketValue && ticketValue.size > 0}
          <AdminTable />
        {:else}
          <p class="m-auto text-royalBlue-800">해당 이벤트에 대한 참여명부가 없습니다.</p>
        {/if}
      </List>
    </main>
  </AppContent>
</div>
