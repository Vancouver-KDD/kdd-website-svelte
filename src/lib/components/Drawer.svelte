<script lang="ts">
  import Drawer, {AppContent, Content} from '@smui/drawer'
  import List, {Item, Text} from '@smui/list'

  export let tickets: App.Ticket[]

  console.log('tickets', tickets)

  let eventNames: string[] = []
  let eventTickets: {eventName: string; tickets: App.Ticket[]}[] = []

  function handleItemClick(eventName: string) {
    const filteredTickets = eventTickets.find((et) => et.eventName === eventName)?.tickets || []
    console.log('filteredTickets', filteredTickets)
  }

  const groupedTickets = tickets.reduce((acc, ticket) => {
    if (!acc[ticket.eventName]) {
      acc[ticket.eventName] = []
    }
    acc[ticket.eventName].push(ticket)
    return acc
  }, {})

  eventTickets = Object.entries(groupedTickets).map(([eventName, tickets]) => {
    return {
      eventName,
      tickets,
    }
  })
</script>

<div class="flex h-full border">
  <Drawer class="w-40 max-h-screen">
    <Content class="h-full">
      <List class="flex-start flex-col gap-4 p-2 border bg-gray-50 h-full overflow-auto">
        {#each eventTickets as { eventName }}
          <Item on:click={() => handleItemClick(eventName)} class="cursor-pointer">
            <Text>{eventName}</Text>
          </Item>
        {/each}
      </List>
    </Content>
  </Drawer>

  <AppContent class="app-content">
    <main class="main-content">
      {#each eventNames as eventName}
        <div>{eventName}</div>
      {/each}
    </main>
  </AppContent>
</div>

<style>
  * :global(.app-content) {
    flex: auto;
    overflow: auto;
    position: relative;
    flex-grow: 1;
  }

  .main-content {
    overflow: auto;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
  }
</style>
