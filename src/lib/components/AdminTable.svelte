<script lang="ts">
  import {activeTickets, cancelledTickets, paidTickets, unpaidTickets} from '$lib/store'
  import * as XLSX from 'xlsx'

  let ticketTable: HTMLTableElement

  function exportData(type: string) {
    const fileName = 'KDD행사리스트.' + type
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
      <th class="w-[3rem]">번호</th>
      <th class="w-[7rem]">신청일</th>
      <th class="w-[6rem]">이름</th>
      <th>Email</th>
      <th class="w-[6rem]">거주지</th>
      <th class="w-[6rem]">직업</th>
      <th class="w-[6rem]">직장</th>

      <!-- for event 밴쿠버 IT회사 옆 대나무숲 -->
      <th class="w-[6rem]">필드</th>
      <th class="w-[6rem]">카톡</th>
      <th class="w-[6rem]">2차 참석?</th>

      <th class="w-[6rem]">처음 참여?</th>
      <th class="w-[6rem]">결제 완료?</th>
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
        <td>{ticket.kakao ? ticket.kakao : '해당없음'}</td>
        <td>{ticket.dinner ? ticket.dinner : '해당없음'}</td>

        <td>{ticket.firstTime}</td>
        <td class={ticket.status !== 'paid' ? 'text-radicalRed-500' : 'text-royalBlue-500'}>{ticket.status === 'paid' ? 'Yes' : 'No' }</td>

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

        <!-- for event 밴쿠버 IT회사 옆 대나무숲 -->
        <td>{ticket.field ? ticket.field : '해당없음'}</td>
        <td>{ticket.kakao ? ticket.kakao : '해당없음'}</td>
        <td>{ticket.dinner ? ticket.dinner : '해당없음'}</td>

        <td>{ticket.firstTime}</td>
        <td class={ticket.status !== 'paid' ? 'text-radicalRed-500' : 'text-royalBlue-500'}>{ticket.status === 'paid' ? 'Yes' : 'No' }</td>

        <td class="text-left">{ticket.message}</td>
      </tr>
    {/each}
  </table>
</div>
