import { Skeleton } from '@/components/ui/skeleton'
import { TableBody, TableCell, TableRow } from '@/components/ui/table' // ← добавлен TableBody
import { type ColumnDef, flexRender, type Row } from '@tanstack/react-table'

interface DataTableBodyProps<TData, TValue> {
  isLoading: boolean
  rows: Row<TData>[]
  columns: readonly ColumnDef<TData, TValue>[]
}

export const DataTableBody = <TData, TValue>({ isLoading, rows, columns }: DataTableBodyProps<TData, TValue>) => {
  // Подготовка содержимого тела таблицы
  let content = null

  if (isLoading) {
    content = Array.from({ length: 5 }).map((_, rowIndex) => (
      // FIXME добавить нормальный id
      <TableRow key={rowIndex}>
        {columns.map((_, colIndex) => (
          <TableCell key={colIndex}>
            <Skeleton className="h-4 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ))
  } else if (rows.length === 0) {
    content = (
      <TableRow>
        <TableCell colSpan={columns.length} className="h-24 text-center">
          No results.
        </TableCell>
      </TableRow>
    )
  } else {
    content = rows.map(row => (
      <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
        {row.getVisibleCells().map(cell => (
          <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
        ))}
      </TableRow>
    ))
  }

  return <TableBody>{content}</TableBody>
}
