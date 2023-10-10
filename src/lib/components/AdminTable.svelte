<script lang="ts">
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
  import type {Readable} from 'svelte/store'

  export let ticketsStore: Readable<DB.Ticket[]>

  let initBodyHtml: string | null = null

  function printContent() {
    window.print()
  }

  function beforePrint() {
    initBodyHtml = document.body.innerHTML
    document.body.innerHTML = document.getElementById('print-area')?.innerHTML as string
  }

  function afterPrint() {
    if (initBodyHtml !== null) {
      document.body.innerHTML = initBodyHtml
      initBodyHtml = null
    }
  }

  window.onbeforeprint = beforePrint
  window.onafterprint = afterPrint
</script>

<div>
  <button
    class="absolute top-0 right-28 m-7 bg-royalBlue-500 hover:bg-royalBlue-600 text-white font-bold py-2 px-4 rounded-lg"
    on:click={printContent}>
    Print
  </button>
  <DataTable stickyHeader aria-label="Ticket List" class="w-[180%] overflow-auto" id="print-area">
    <Head class="w-full">
      <Row class="border text-center bg-royalBlue-50 m-4">
        <Cell class="w-[2%]">번호</Cell>
        <Cell class="w-[5%]">신청일</Cell>
        <Cell class="w-[8%]">이름</Cell>
        <Cell class="w-[20%]">Email</Cell>
        <Cell class="">직업</Cell>
        <Cell class="">직장</Cell>
        <Cell class="">거주지</Cell>
        <Cell class="w-[4%]">처음 참여?</Cell>
        <Cell class="text-left pl-4 w-[40%]">비고</Cell>
      </Row>
    </Head>
    <Body class="w-full">
      {#each $ticketsStore.filter((ticket) => ticket.status !== 'cancelled') as ticket, index (ticket.id)}
        <Row class="border text-center">
          <Cell class="w-[2%]">{index + 1}</Cell>
          <Cell class="w-[5%]">{ticket.createdAt.toDate().toLocaleDateString()}</Cell>
          <Cell class="w-[8%]">{ticket.name}</Cell>
          <Cell class="w-[20%]">{ticket.email}</Cell>
          <Cell>{ticket.occupation}</Cell>
          <Cell class="">{ticket.work}</Cell>
          <Cell class="">{ticket.location}</Cell>
          <Cell class="w-[4%]">{ticket.firstTime}</Cell>
          <Cell class="text-left pl-4 w-[40%]">{ticket.message}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
  <div class="mt-8 mb-2">
    <h1 class="text-lg font-semibold">Canceled Tickets</h1>
  </div>
  <DataTable stickyHeader aria-label="Cancelled Ticket List" class="w-[180%] overflow-auto">
    <Head class="w-full">
      <Row class="border text-center bg-radicalRed-50 m-4">
        <Cell class="w-[2%]">번호</Cell>
        <Cell class="w-[5%]">신청일</Cell>
        <Cell class="w-[8%]">이름</Cell>
        <Cell class="w-[20%]">Email</Cell>
        <Cell class="">직업</Cell>
        <Cell class="">직장</Cell>
        <Cell class="">거주지</Cell>
        <Cell class="w-[4%]">처음 참여?</Cell>
        <Cell class="text-left pl-4 w-[40%]">비고</Cell>
      </Row>
    </Head>
    <Body class="w-full">
      {#each $ticketsStore.filter((ticket) => ticket.status === 'cancelled') as ticket, index (ticket.id)}
        <Row class="border text-center">
          <Cell class="w-[2%]">{index + 1}</Cell>
          <Cell class="w-[5%]">{ticket.createdAt.toDate().toLocaleDateString()}</Cell>
          <Cell class="w-[8%]">{ticket.name}</Cell>
          <Cell class="w-[20%]">{ticket.email}</Cell>
          <Cell>{ticket.occupation}</Cell>
          <Cell class="">{ticket.work}</Cell>
          <Cell class="">{ticket.location}</Cell>
          <Cell class="w-[4%]">{ticket.firstTime}</Cell>
          <Cell class="text-left pl-4 w-[40%]">{ticket.message}</Cell>
        </Row>
      {/each}
    </Body>
  </DataTable>
</div>
