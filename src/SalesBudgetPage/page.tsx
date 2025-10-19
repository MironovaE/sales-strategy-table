import { useState } from 'react'

import { columns } from '@/SalesBudgetPage/columns/columns.tsx'
import { DataTable } from '@/SalesBudgetPage/dataTable.tsx'
import { useSortParams } from '@/SalesBudgetPage/useSortParams.ts'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import { useGetSalesStrategyDetailQuery } from '@/services/salesStrategy/salesStrategyApi.ts'
import type { PaginationState, SortingState, Updater } from '@tanstack/react-table'

export const SalesBudgetPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const [sorting, setSorting] = useState<SortingState>([])

  const sortParams = useSortParams<SalesBudgetResult>(sorting)

  const { data, isFetching, isLoading } = useGetSalesStrategyDetailQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
    ...sortParams,
    // error: true, // ← раскомментируйте для теста ошибки
  })

  const { salesBudget = [], total = 0 } = data ?? {}

  // Сброс на первую страницу при смене pageSize
  const handlePageSizeChange = (newSize: number) => {
    setPagination(() => ({ pageIndex: 0, pageSize: newSize }))
  }
  const handleSortingChange = (updater: Updater<SortingState>) => {
    // Сбрасываем на первую страницу при смене сортировки
    setPagination(prev => ({ ...prev, pageIndex: 0 }))
    // Передаём updater напрямую в setSorting (поддерживает и значение, и функцию)
    setSorting(updater)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Бюджет продаж</h1>
      <DataTable
        columns={columns}
        isLoading={isFetching || isLoading}
        data={salesBudget}
        total={total}
        pagination={pagination}
        onPaginationChange={setPagination}
        onPageSizeChange={handlePageSizeChange}
        sorting={sorting}
        onSortingChange={handleSortingChange}
      />
    </div>
  )
}
