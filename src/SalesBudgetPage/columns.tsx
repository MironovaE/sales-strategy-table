import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { ColumnDef } from '@tanstack/react-table'

const formatISODate = (dateStr: string) => {
  if (!dateStr) return ''

  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return ''

  return date.toLocaleDateString('ru-RU') // например: "04.09.2025"
}

export const columns: ColumnDef<SalesBudgetResult>[] = [
  {
    accessorKey: 'administrativeDistrict',
    header: 'Округ',
  },
  {
    accessorKey: 'district',
    header: 'Район',
  },
  {
    accessorKey: 'address',
    header: 'Адрес МКД',
  },
  {
    accessorKey: 'type',
    header: 'Тип',
  },
  {
    accessorKey: 'countItem',
    header: 'Количество в шт на 2025г',
  },
  {
    accessorKey: 'currentRemainingUnits',
    header: 'Остаток на текущий момент, шт',
  },
  {
    accessorKey: 'publishedAuctionsCount',
    header: 'Опубликовано АУК, шт.',
  },
  {
    accessorKey: 'publishedPublicOffersCount',
    header: 'Опубликовано ПП, шт.',
  },
  {
    accessorKey: 'remainingToPublish',
    header: 'Остаток к выставлению шт.',
  },
  {
    accessorKey: 'averageArea',
    header: 'Средняя квадратура',
  },
  {
    accessorKey: 'forecastedBuildingPermits',
    header: 'РнС прогнозный',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedBuildingPermits'))}</div>
    ),
  },
  {
    accessorKey: 'firstAuctionStartDate',
    header: 'Старт продаж (1 аукцион)',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('firstAuctionStartDate'))}</div>
    ),
  },
  {
    accessorKey: 'forecastedCommissioningDate',
    header: 'Ввод прогнозный',
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedCommissioningDate'))}</div>
    ),
  },
  {
    accessorKey: 'commissioningDatePerPd',
    header: 'Ввод по ПД',
  },
  {
    accessorKey: 'constructionProgressPercent',
    header: 'Процент строй-готовности',
  },
  {
    accessorKey: 'liquidityCategory',
    header: 'Ликвидность',
  },
  {
    accessorKey: 'startingPrice',
    header: 'Стартовая цена',
    cell: ({ row }) => {
      const startingPrice = parseFloat(row.getValue('startingPrice'))
      const formatted = new Intl.NumberFormat('ru-RU', {
        maximumFractionDigits: 0,
      }).format(startingPrice)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
  },
]
