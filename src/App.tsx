import { Button } from '@/components/ui/button'
import { useGetSalesStrategyDetailQuery } from '@/services/salesStrategyApi.ts'

function App() {
  const { data, isLoading, error } = useGetSalesStrategyDetailQuery({ page: 1, limit: 10 })
  console.log('data', data)
  if (isLoading) return <div className="text-center p-10">Загрузка...</div>
  if (error) return <div className="text-center p-10 text-red-500">Ошибка загрузки</div>

  return (
    <div className="flex min-h-screen items-center justify-center">
      <Button>Тык</Button>
    </div>
  )
}

export default App
