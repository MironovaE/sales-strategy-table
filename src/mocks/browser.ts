import { setupWorker } from 'msw/browser'
import { salesStrategyHandlers } from './handlers/salesStrategyHandlers/salesStrategyHandlers.ts'

// Объединяем все хендлеры (в будущем можно добавить другие)
const handlers = [...salesStrategyHandlers]

// Создаём и экспортируем воркер
export const worker = setupWorker(...handlers)
