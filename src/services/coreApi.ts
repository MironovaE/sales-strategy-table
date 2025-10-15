import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const coreApi = createApi({
  baseQuery: fetchBaseQuery({
    // 🔥 Берём URL из .env.development
    baseUrl: import.meta.env.VITE_DEV_API_URL,
  }),
  endpoints: () => ({}),
})
