<script lang="ts">
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
  import type {Readable} from 'svelte/store'

  export let ticketsStore: Readable<DB.Ticket[]>
</script>

<DataTable stickyHeader aria-label="User list" class="w-[180%] overflow-auto">
  <Head class="w-full">
    <Row class="border text-center bg-royalBlue-50 m-4">
      <Cell class="text-left pl-4">신청일</Cell>
      <Cell class="">이름</Cell>
      <Cell class="">Email</Cell>
      <Cell class="">직업</Cell>
      <Cell class="pl-2">직장</Cell>
      <Cell class="pl-2">거주지</Cell>
      <Cell class="pl-2">처음 참여?</Cell>
      <Cell class="text-left pl-4">비고</Cell>
    </Row>
  </Head>
  <Body class="w-full">
    {#each $ticketsStore as ticket (ticket.id)}
      <Row class="border text-center">
        <Cell class="text-left pl-4">{ticket.createdAt.toDate().toLocaleDateString()}</Cell>
        <Cell>{ticket.name}</Cell>
        <Cell>{ticket.email}</Cell>
        <Cell>{ticket.occupation}</Cell>
        <Cell class="pl-2">{ticket.work}</Cell>
        <Cell class="pl-2">{ticket.location}</Cell>
        <Cell class="pl-2">{ticket.firstTime}</Cell>
        <Cell class="text-left pl-4">{ticket.message}</Cell>
      </Row>
    {/each}
  </Body>
</DataTable>
