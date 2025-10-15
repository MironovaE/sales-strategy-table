import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card.tsx'
import { useGetSalesStrategyDetailQuery } from '@/services/salesStrategyApi.ts'

import { columns } from './columns'
import { DataTable } from './dataTable'

export const SalesBudgetPage = () => {
  const { data = [], isFetching, isLoading, error } = useGetSalesStrategyDetailQuery({ page: 1, limit: 10 })

  return (
    <Card>
      <CardHeader>
        <CardTitle>Бюджет продаж</CardTitle>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={data} isLoading={isFetching || isLoading} error={error} />
      </CardContent>
    </Card>
  )
}
