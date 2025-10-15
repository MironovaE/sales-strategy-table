/* eslint-disable */
import { coreApi } from './coreApi.ts'

export const salesStrategyApi = coreApi.enhanceEndpoints({ addTagTypes: ['SalesStrategy'] }).injectEndpoints({
  endpoints: build => ({
    getSalesStrategyDetail: build.query<unknown, number>({
      query: page => ({
        url: '/salesStrategy/detail',
        method: 'GET',
        params: { page }, // ← автоматически станет ?page=2
      }),
      transformResponse: (response: any) => response.result,
      providesTags: ['SalesStrategy'],
    }),
  }),
})

export const { useGetSalesStrategyDetailQuery } = salesStrategyApi
