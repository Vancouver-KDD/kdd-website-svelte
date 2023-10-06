<script lang="ts">
  import Drawer, {AppContent, Content} from '@smui/drawer'
  import List, {Item, Text} from '@smui/list'

  let clicked = ''
</script>

<div class="drawer-container">
  <Drawer class="w-40 max-h-screen">
    <Content class="h-full">
      <List class="flex-start flex-col gap-4 p-4 border bg-gray-50 h-full">
        <Item
          href="javascript:void(0)"
          class="text-center"
          on:click={() => (clicked = '9월 Event')}>
          <Text>9월 Event</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          class="text-center"
          on:click={() => (clicked = '8월 Event')}>
          <Text>8월 Event</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          class="text-center"
          on:click={() => (clicked = '7월 Event')}>
          <Text>7월 Event</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          class="text-center"
          on:click={() => (clicked = '6월 Event')}>
          <Text>6월 Event</Text>
        </Item>
        <Item
          href="javascript:void(0)"
          class="text-center"
          on:click={() => (clicked = '5월 Event')}>
          <Text>5월 Event</Text>
        </Item>
      </List>
    </Content>
  </Drawer>

  <AppContent class="app-content">
    <main class="main-content">
      <div id="json-output"></div>
    </main>
  </AppContent>
</div>

<style>
  .drawer-container {
    position: relative;
    display: flex;
    height: 350px;
    border: 1px solid var(--mdc-theme-text-hint-on-background, rgba(0, 0, 0, 0.1));
    overflow: hidden;
    z-index: 0;
  }

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
