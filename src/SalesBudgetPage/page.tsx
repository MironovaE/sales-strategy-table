import { useState } from 'react'

import { columns } from '@/SalesBudgetPage/columns.tsx'
import { DataTable } from '@/SalesBudgetPage/dataTable.tsx'
import { useGetSalesStrategyDetailQuery } from '@/services/salesStrategy/salesStrategyApi.ts'
import type { PaginationState } from '@tanstack/react-table'

export const SalesBudgetPage = () => {
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isFetching, isLoading } = useGetSalesStrategyDetailQuery({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  })

  const { salesBudget = [], total = 0 } = data ?? {}

  // Сброс на первую страницу при смене pageSize
  const handlePageSizeChange = (newSize: number) => {
    setPagination(() => ({ pageIndex: 0, pageSize: newSize }))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Бюджет продаж</h1>
      <DataTable
        columns={columns}
        data={salesBudget}
        total={total}
        pagination={pagination}
        isLoading={isFetching || isLoading}
        onPaginationChange={setPagination}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
