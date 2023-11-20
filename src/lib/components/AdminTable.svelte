<script lang="ts">
  import {activeTickets, cancelledTickets} from '$lib/store'
  import * as XLSX from 'xlsx'

  export let events: DB.Event[]

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
    class="hidden md:block absolute top-0 right-24 m-7 bg-amber-400/75 hover:bg-amber-400 text-white font-bold py-2 px-4 rounded-lg"
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
      <th>거주지</th>
      <th>직업</th>
      <th>직장</th>

      <!-- for event 밴쿠버 IT회사 옆 대나무숲 -->
      <th>필드</th>
      <th>카톡</th>
      <th>2차 참석?</th>

      <th>처음 참여?</th>
      <th class="w-[40rem] text-left">비고</th>
    </tr>
    {#each $activeTickets.slice().reverse() as ticket, index (ticket.id)}
      <tr class="border text-center">
        <td>{index + 1}</td>
        <td>{ticket.createdAt.toDate().toLocaleDateString()}</td>
        <td>{ticket.name}</td>
        <td>{ticket.email}</td>
        <td>{ticket.location}</td>
        <td>{ticket.occupation}</td>
        <td>{ticket.work}</td>

        <!-- for event 밴쿠버 IT회사 옆 대나무숲 -->
        <td>{ticket.field ? ticket.field : '해당없음'}</td>
        <td>{ticket.kakao ? ticket.field : '해당없음'}</td>
        <td>{ticket.dinner ? ticket.field : '해당없음'}</td>

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

    {#each $cancelledTickets.slice().reverse() as ticket, index (ticket.id)}
      <tr class="border text-center">
        <td>{index + 1}</td>
        <td>{ticket.createdAt.toDate().toLocaleDateString()}</td>
        <td>{ticket.name}</td>
        <td>{ticket.email}</td>
        <td>{ticket.location}</td>
        <td>{ticket.occupation}</td>
        <td>{ticket.work}</td>

        <td>{ticket.field}</td>
        <td>{ticket.kakao}</td>
        <td>{ticket.dinner}</td>

        <td>{ticket.firstTime}</td>
        <td class="text-left">{ticket.message}</td>
      </tr>
    {/each}
  </table>
</div>
