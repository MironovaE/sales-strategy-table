import { Table } from '@/components/ui/table'
import { PageSizeSelector } from '@/SalesBudgetPage/pageSizeSelector.tsx'
import { ServerPagination } from '@/SalesBudgetPage/serverPagination.tsx'
import { DataTableBody } from '@/SalesBudgetPage/tableBody.tsx'
import { DataTableHeader } from '@/SalesBudgetPage/tableHeader.tsx'
import { TotalCount } from '@/SalesBudgetPage/totalCount.tsx'
import {
  type ColumnDef,
  getCoreRowModel,
  type PaginationState,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  total: number
  isLoading: boolean
  pagination: PaginationState
  onPaginationChange: (updater: Updater<PaginationState>) => void
  onPageSizeChange: (size: number) => void
  sorting: SortingState
  onSortingChange: (updater: Updater<SortingState>) => void
}

export function DataTable<TData, TValue>({
  columns,
  data,
  total,
  isLoading,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  sorting,
  onSortingChange,
}: Readonly<DataTableProps<TData, TValue>>) {
  const table = useReactTable({
    data,
    columns,
    pageCount: Math.ceil(total / pagination.pageSize),
    manualPagination: true,
    manualSorting: true,
    state: {
      pagination,
      sorting,
    },
    onPaginationChange,
    onSortingChange,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <DataTableHeader headers={table.getHeaderGroups()} />
        <DataTableBody isLoading={isLoading} rows={table.getRowModel().rows} columns={columns} />
      </Table>

      <div className="flex flex-wrap items-center justify-between gap-4 p-4">
        <TotalCount total={total} />
        <div className="flex items-center gap-2">
          <PageSizeSelector pageSize={pagination.pageSize} onPageSizeChange={onPageSizeChange} />
          <ServerPagination table={table} />
        </div>
      </div>
    </div>
  )
}
