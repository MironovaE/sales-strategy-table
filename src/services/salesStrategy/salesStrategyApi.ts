import { coreApi } from '@/services/coreApi.ts'
import type { ApiResponseDetail, QueryParamsWithSort } from '@/services/models.ts'
import type { SalesBudgetResult, SalesStrategyResponse } from '@/services/salesStrategy/models.ts'

export const salesStrategyApi = coreApi.enhanceEndpoints({ addTagTypes: ['SalesStrategy'] }).injectEndpoints({
  endpoints: build => ({
    getSalesStrategyDetail: build.query<SalesStrategyResponse, QueryParamsWithSort<SalesBudgetResult>>({
      query: ({ page, limit = 10, sortBy, sortOrder }) => ({
        url: '/salesStrategy/detail',
        method: 'GET',
        params: { page, limit, sortBy, sortOrder },
      }),
      transformResponse: (response: ApiResponseDetail<SalesStrategyResponse>) => response.result,
      providesTags: ['SalesStrategy'],
    }),
  }),
})

export const { useGetSalesStrategyDetailQuery } = salesStrategyApi
