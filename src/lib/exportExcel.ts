import type {Table} from '@tanstack/svelte-table'
import {Workbook} from 'exceljs'
import {saveAs} from 'file-saver'

export default async function exportExcel(table: Table<unknown>, filename: string) {
  const wb = new Workbook()
  const ws = wb.addWorksheet('Sheet1')

  const lastHeaderGroup = table.getHeaderGroups().at(-1)
  if (!lastHeaderGroup) {
    console.error('No header group found', table.getHeaderGroups())
    return
  }

  ws.columns = lastHeaderGroup.headers
    .filter((h) => h.column.getIsVisible())
    .map((header) => {
      return {
        header: header.column.columnDef.header as string,
        key: header.id,
        width: 20,
      }
    })

  table.getCoreRowModel().rows.forEach((row) => {
    const cells = row.getVisibleCells()
    const values = cells.map((cell) => cell.getValue() ?? '')

    ws.addRow(values)
  })

  ws.getRow(1).eachCell((cell) => {
    cell.font = {
      bold: true,
    }
  })

  const buf = await wb.xlsx.writeBuffer()
  saveAs(new Blob([buf]), `${filename}.xlsx`)
}
