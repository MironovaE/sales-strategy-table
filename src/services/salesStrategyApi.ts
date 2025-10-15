/* eslint-disable */
import { coreApi } from './coreApi.ts'
import type { SalesBudget } from '@/SalesBudgetPage/columns.tsx'

export const salesStrategyApi = coreApi.enhanceEndpoints({ addTagTypes: ['SalesStrategy'] }).injectEndpoints({
  endpoints: build => ({
    getSalesStrategyDetail: build.query<SalesBudget[], { page: number; limit?: number }>({
      query: ({ page, limit = 10 }) => ({
        url: '/salesStrategy/detail',
        method: 'GET',
        params: { page, limit },
      }),
      transformResponse: (response: any) => response.result,
      providesTags: ['SalesStrategy'],
    }),
  }),
})

export const { useGetSalesStrategyDetailQuery } = salesStrategyApi
