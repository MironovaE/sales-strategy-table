import { useCallback, useMemo, useState } from 'react'

import { Table } from '@/components/ui/table'
import { ColumnVisibilityModal } from '@/SalesBudgetPage/columns/columnVisibilityModal'
import { renderSortableHeader } from '@/SalesBudgetPage/columns/helpers'
import { PageSizeSelector } from '@/SalesBudgetPage/pageSizeSelector'
import { ServerPagination } from '@/SalesBudgetPage/serverPagination'
import { DataTableBody } from '@/SalesBudgetPage/tableBody'
import { DataTableHeader } from '@/SalesBudgetPage/tableHeader'
import { TotalCount } from '@/SalesBudgetPage/totalCount'
import type { SalesBudgetResult } from '@/services/salesStrategy/models'
import {
  type ColumnDef,
  getCoreRowModel,
  type HeaderContext,
  type PaginationState,
  type SortingState,
  type Updater,
  useReactTable,
} from '@tanstack/react-table'

// Type guard для проверки наличия accessorKey
const hasAccessorKey = (
  col: ColumnDef<SalesBudgetResult>,
): col is ColumnDef<SalesBudgetResult> & { accessorKey: string } =>
  'accessorKey' in col && typeof col.accessorKey === 'string'

interface DataTableProps {
  columns: ColumnDef<SalesBudgetResult>[]
  data: SalesBudgetResult[]
  total: number
  isLoading: boolean
  pagination: PaginationState
  onPaginationChange: (updater: Updater<PaginationState>) => void
  onPageSizeChange: (size: number) => void
  sorting: SortingState
  onSortingChange: (updater: Updater<SortingState>) => void
}

export function DataTable({
  columns: rawColumns,
  data,
  total,
  isLoading,
  pagination,
  onPaginationChange,
  onPageSizeChange,
  sorting,
  onSortingChange,
}: Readonly<DataTableProps>) {
  const [isColumnModalOpen, setIsColumnModalOpen] = useState(false)

  const openColumnModal = useCallback(() => {
    setIsColumnModalOpen(true)
  }, [])

  // Автоматически оборачиваем строковые заголовки в renderSortableHeader
  const processedColumns = useMemo(() => {
    return rawColumns.map(col => {
      if (typeof col.header === 'string' && hasAccessorKey(col)) {
        return {
          ...col,
          header: (ctx: HeaderContext<SalesBudgetResult, unknown>) =>
            renderSortableHeader(ctx.column, col.header as string, openColumnModal),
        }
      }
      return col
    })
  }, [rawColumns, openColumnModal])

  const table = useReactTable({
    data,
    columns: processedColumns,
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

  const allColumns = table.getAllColumns()

  return (
    <div className="overflow-x-auto rounded-md border">
      <Table className="min-w-full">
        <DataTableHeader headers={table.getHeaderGroups()} />
        <DataTableBody isLoading={isLoading} rows={table.getRowModel().rows} columns={processedColumns} />
      </Table>

      <ColumnVisibilityModal columns={allColumns} open={isColumnModalOpen} onOpenChange={setIsColumnModalOpen} />

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
