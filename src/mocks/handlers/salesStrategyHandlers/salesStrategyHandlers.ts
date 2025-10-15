/* eslint-disable */
import { http, HttpResponse } from 'msw'
import { salesStrategyDetailData } from './salesStrategyDetailData'

const LIMIT = 10 // ← фиксированный лимит, как на фронтенде

export const salesStrategyHandlers = [
  http.get('/salesStrategy/detail', ({ request }) => {
    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)

    const allData = salesStrategyDetailData()
    const startIndex = (page - 1) * LIMIT
    const endIndex = startIndex + LIMIT

    const result = allData.slice(startIndex, endIndex)

    // Возвращаем ТОЛЬКО { result: [...] }, как ожидает transformResponse
    return HttpResponse.json({
      result,
    })
  }),
]
