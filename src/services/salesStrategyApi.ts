/* eslint-disable */
import { coreApi } from './coreApi.ts'

export const salesStrategyApi = coreApi.enhanceEndpoints({ addTagTypes: ['SalesStrategy'] }).injectEndpoints({
  endpoints: build => ({
    getSalesStrategyDetail: build.query<any, any>({
      query: data => ({
        url: '',
        method: 'post',
        data,
      }),
      transformResponse: (response: any) => response.result,
      providesTags: ['SalesStrategy'],
    }),
  }),
})
