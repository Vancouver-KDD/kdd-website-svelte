<script lang="ts">
  import Drawer, {AppContent, Content} from '@smui/drawer'
  import List, {Item, Text} from '@smui/list'

  let clicked = ''
</script>

<div class="flex h-full border">
  <Drawer class="w-40 max-h-screen">
    <Content class="h-full">
      <List class="flex-start flex-col gap-4 p-2 border bg-gray-50 h-full overflow-auto">
        <Item
          href="javascript:void(0)"
          class="text-center p-2 hover:bg-gray-300 focus:bg-gray-300"
          on:click={() => (clicked = '9월 Event')}>
          <Text>9월 Event</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          class="text-center p-2 hover:bg-gray-300 focus:bg-gray-300"
          on:click={() => (clicked = '8월 Event')}>
          <Text>8월 Event</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <AppContent class="app-content">
    <main class="main-content">
      <div id="json-output">{clicked}</div>
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
