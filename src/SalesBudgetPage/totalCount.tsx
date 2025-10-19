interface TotalCountProps {
  total: number
}

export const TotalCount = ({ total }: TotalCountProps) => {
  const formatNumber = (num: number) => new Intl.NumberFormat('ru-RU').format(num)
  return (
    <div className="text-sm text-muted-foreground">
      Всего: <span className="font-medium">{formatNumber(total)}</span>
    </div>
  )
}
