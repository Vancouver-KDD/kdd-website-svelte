<script lang="ts">
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
  import type {Readable} from 'svelte/store'

  export let ticketsStore: Readable<DB.Ticket[]>
</script>

<DataTable stickyHeader table$aria-label="User list" class="w-full">
  <Head class="w-full">
    <Row class="border text-center bg-royalBlue-50 m-4">
      <Cell class="text-left pl-4 w-32">신청일</Cell>
      <Cell>이름</Cell>
      <Cell>Email</Cell>
      <Cell>직업</Cell>
      <Cell>직장</Cell>
      <Cell>거주지</Cell>
      <Cell>처음 참여?</Cell>
      <Cell>비고</Cell>
    </Row>
  </Head>
  <Body class="w-full">
    {#each $ticketsStore as ticket (ticket.id)}
      <Row class="border text-center">
        <Cell class="text-left pl-4">{ticket.createdAt.toDate().toLocaleDateString()}</Cell>
        <Cell>{ticket.name}</Cell>
        <Cell>{ticket.email}</Cell>
        <Cell>{ticket.occupation}</Cell>
        <Cell>{ticket.work}</Cell>
        <Cell>{ticket.location}</Cell>
        <Cell>{ticket.firstTime}</Cell>
        <Cell>{ticket.message}</Cell>
      </Row>
    {/each}
  </Body>
</DataTable>
