<script lang="ts">
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
  import {activeTickets, cancelledTickets} from '$lib/store'
  // import exportExcel from '$lib/exportExcel'

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
    class="hidden md:block absolute top-0 right-24 m-7 bg-royalBlue-500/75 hover:bg-royalBlue-500 text-white font-bold py-2 px-4 rounded-lg"
    on:click={printContent}>
    Print
  </button>
  <button
    class="hidden md:block absolute top-0 right-44 m-7 bg-amber-300/75 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg">
    <!-- on:click={() => exportExcel(null, 'data.csv')} -->
    CSV
  </button>
  <DataTable stickyHeader aria-label="Ticket List" class="w-[180%] overflow-auto" id="print-area">
    <Head class="w-full">
      <Row class="border text-center bg-royalBlue-50 m-4">
        <Cell class="w-[5%] md:w-[2%]">번호</Cell>
        <Cell class="w-[15%] md:w-[5%]">신청일</Cell>
        <Cell class="w-[15%] md:w-[8%]">이름</Cell>
        <Cell class="w-[20%]">Email</Cell>
        <Cell class="w-[10%] md:w-[4%]">직업</Cell>
        <Cell class="w-[10%] md:w-[4%]">직장</Cell>
        <Cell class="w-[10%] md:w-[4%]">거주지</Cell>
        <Cell class="w-[10%] md:w-[4%]">처음 참여?</Cell>
        <Cell class="text-left pl-4 w-[40%]">비고</Cell>
      </Row>
    </Head>
    <Body class="w-full">
      {#each $activeTickets as ticket, index (ticket.id)}
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
        <Cell class="w-[5%] md:w-[2%]">번호</Cell>
        <Cell class="w-[15%] md:w-[5%]">신청일</Cell>
        <Cell class="w-[15%] md:w-[8%]">이름</Cell>
        <Cell class="w-[20%]">Email</Cell>
        <Cell class="w-[10%] md:w-[4%]">직업</Cell>
        <Cell class="w-[10%] md:w-[4%]">직장</Cell>
        <Cell class="w-[10%] md:w-[4%]">거주지</Cell>
        <Cell class="w-[10%] md:w-[4%]">처음 참여?</Cell>
        <Cell class="text-left pl-4 w-[40%]">비고</Cell>
      </Row>
    </Head>
    <Body class="w-full">
      {#each $cancelledTickets as ticket, index (ticket.id)}
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
