import { coreApi } from '@/services/coreApi.ts'
import type { ApiResponseDetail, Pagination } from '@/services/models.ts'
import type { SalesStrategyResponse } from '@/services/salesStrategy/models.ts'

export const salesStrategyApi = coreApi.enhanceEndpoints({ addTagTypes: ['SalesStrategy'] }).injectEndpoints({
  endpoints: build => ({
    getSalesStrategyDetail: build.query<SalesStrategyResponse, Pagination>({
      query: ({ page, limit = 10 }) => ({
        url: '/salesStrategy/detail',
        method: 'GET',
        params: { page, limit },
      }),
      transformResponse: (response: ApiResponseDetail<SalesStrategyResponse>) => response.result,
      providesTags: ['SalesStrategy'],
    }),
  }),
})

export const { useGetSalesStrategyDetailQuery } = salesStrategyApi
