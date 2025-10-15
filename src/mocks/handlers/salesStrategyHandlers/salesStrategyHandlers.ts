import { delay, http, HttpResponse } from 'msw'
import { salesStrategyDetailData } from './salesStrategyDetailData'

const LIMIT = 10

export const salesStrategyHandlers = [
  http.get('/salesStrategy/detail', async ({ request }) => {
    const url = new URL(request.url)
    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)

    const allData = salesStrategyDetailData()
    const startIndex = (page - 1) * LIMIT
    const endIndex = startIndex + LIMIT

    const result = allData.slice(startIndex, endIndex)

    // Добавляем задержку (например, 500 мс)
    await delay(500)

    return HttpResponse.json({
      result,
    })
  }),
]
