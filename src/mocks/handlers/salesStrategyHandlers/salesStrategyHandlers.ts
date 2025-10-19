import { compareValues } from '@/mocks/handlers/salesStrategyHandlers/utils.ts'

import { delay, http, HttpResponse } from 'msw'
import { salesStrategyDetailData } from './salesStrategyDetailData'

const LIMIT = 10

export const salesStrategyHandlers = [
  http.get('/salesStrategy/detail', async ({ request }) => {
    const url = new URL(request.url)

    if (url.searchParams.get('error') === 'true') {
      await delay(500)
      return HttpResponse.json({ message: 'Ошибка' }, { status: 500 })
    }

    const page = Math.max(1, Number(url.searchParams.get('page')) || 1)
    const limit = Number(url.searchParams.get('limit')) || LIMIT
    const sortBy = url.searchParams.get('sortBy')
    const sortOrder = url.searchParams.get('sortOrder') // 'asc' или 'desc'

    let allData = salesStrategyDetailData()

    // Сортировка, если указано поле
    if (sortBy) {
      allData = [...allData].sort((a, b) => {
        const aValue = a[sortBy as keyof typeof a]
        const bValue = b[sortBy as keyof typeof b]
        const result = compareValues(aValue, bValue)
        return sortOrder === 'desc' ? -result : result
      })
    }

    const total = allData.length
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const salesBudget = allData.slice(startIndex, endIndex)

    await delay(500)

    return HttpResponse.json({
      result: {
        salesBudget,
        total,
      },
    })
  }),
]
