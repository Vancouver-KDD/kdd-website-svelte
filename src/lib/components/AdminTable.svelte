<script lang="ts">
  import DataTable, {Head, Body, Row, Cell} from '@smui/data-table'
  import {activeTickets, cancelledTickets} from '$lib/store'
  import exportExcel from '$lib/exportExcel'
  import type {Table} from 'airtable'
  import * as XLSX from 'xlsx'

  export let events: DB.Event[]

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

  let ticketTable: HTMLTableElement

  function exportData(type: string) {
    const fileName = `${events[0].title}.` + type
    const table = ticketTable
    const wb = XLSX.utils.table_to_book(table)
    XLSX.writeFile(wb, fileName)
  }
</script>

<div>
  <button
    class="hidden md:block absolute top-0 right-24 m-7 bg-royalBlue-500/75 hover:bg-royalBlue-500 text-white font-bold py-2 px-4 rounded-lg"
    on:click={printContent}>
    Print
  </button>
  <button
    class="hidden md:block absolute top-0 right-44 m-7 bg-amber-300/75 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
    on:click={() => {
      exportData('csv')
    }}>
    CSV
  </button>
  <table aria-label="Ticket List" class="w-full" id="print-area" bind:this={ticketTable}>
    <tr class="border text-center bg-royalBlue-50 m-4">
      <th>번호</th>
      <th>신청일</th>
      <th>이름</th>
      <th>Email</th>
      <th>직업</th>
      <th>직장</th>
      <th>거주지</th>
      <th>처음 참여?</th>
      <th class="w-[40rem] text-left">비고</th>
    </tr>
    {#each $activeTickets as ticket, index (ticket.id)}
      <tr class="border text-center">
        <td>{index + 1}</td>
        <td>{ticket.createdAt.toDate().toLocaleDateString()}</td>
        <td>{ticket.name}</td>
        <td>{ticket.email}</td>
        <td>{ticket.occupation}</td>
        <td>{ticket.work}</td>
        <td>{ticket.location}</td>
        <td>{ticket.firstTime}</td>
        <td class="text-left">{ticket.message}</td>
      </tr>
    {/each}

    <br />
    <tr class="text-left">
      <th class="text-base font-semibold text-radicalRed-600" colspan="3">Canceled Tickets</th>
      <th class="text-lg font-semibold"></th>
      <th class="text-lg font-semibold"></th>
    </tr>

    {#each $cancelledTickets as ticket, index (ticket.id)}
      <tr class="border text-center">
        <td>{index + 1}</td>
        <td>{ticket.createdAt.toDate().toLocaleDateString()}</td>
        <td>{ticket.name}</td>
        <td>{ticket.email}</td>
        <td>{ticket.occupation}</td>
        <td>{ticket.work}</td>
        <td>{ticket.location}</td>
        <td>{ticket.firstTime}</td>
        <td class="text-left">{ticket.message}</td>
      </tr>
    {/each}
  </table>
</div>
