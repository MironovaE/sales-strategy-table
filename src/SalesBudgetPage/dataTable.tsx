import { Table } from '@/components/ui/table'
import { DataTableBody } from '@/SalesBudgetPage/tableBody.tsx'
import { DataTableHeader } from '@/SalesBudgetPage/tableHeader.tsx'
import { type ColumnDef, getCoreRowModel, useReactTable } from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading: boolean
  error: unknown
}

export function DataTable<TData, TValue>({ columns, data, isLoading }: Readonly<DataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data: data,
    columns: columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <DataTableHeader headers={table.getHeaderGroups()} />
        <DataTableBody isLoading={isLoading} rows={table.getRowModel().rows} columns={columns} />
      </Table>
    </div>
  )
}
