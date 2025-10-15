/* eslint-disable */
import { http, HttpResponse } from 'msw'

export const salesStrategyHandlers = [
  http.get('/salesStrategy/detail', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page')) || 1

    console.log('Mock: requested page', page)

    // Пример: разные данные на разных страницах
    const mockData = {
      1: [
        { id: 1, name: 'Alice (mock)' },
        { id: 2, name: 'Bob (mock)' },
      ],
      2: [
        { id: 3, name: 'Charlie (mock)' },
        { id: 4, name: 'Dana (mock)' },
      ],
    }

    const result = mockData[page] || []

    return HttpResponse.json({
      result,
    })
  }),
]
