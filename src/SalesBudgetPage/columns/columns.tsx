import { formatISODate, renderSortableHeader } from '@/SalesBudgetPage/columns/helpers.tsx'
import type { SalesBudgetResult } from '@/services/salesStrategy/models.ts'
import type { ColumnDef } from '@tanstack/react-table'

export const columns: ColumnDef<SalesBudgetResult>[] = [
  {
    accessorKey: 'administrativeDistrict',
    header: ({ column }) => renderSortableHeader(column, 'Округ'),
  },
  {
    accessorKey: 'district',
    header: ({ column }) => renderSortableHeader(column, 'Район'),
  },
  {
    accessorKey: 'address',
    header: ({ column }) => renderSortableHeader(column, 'Адрес МКД'),
  },
  {
    accessorKey: 'type',
    header: ({ column }) => renderSortableHeader(column, 'Тип'),
  },
  {
    accessorKey: 'countItem',
    header: ({ column }) => renderSortableHeader(column, 'Количество в шт на 2025г'),
  },
  {
    accessorKey: 'currentRemainingUnits',
    header: ({ column }) => renderSortableHeader(column, 'Остаток на текущий момент, шт'),
  },
  {
    accessorKey: 'publishedAuctionsCount',
    header: ({ column }) => renderSortableHeader(column, 'Опубликовано АУК, шт.'),
  },
  {
    accessorKey: 'publishedPublicOffersCount',
    header: ({ column }) => renderSortableHeader(column, 'Опубликовано ПП, шт.'),
  },
  {
    accessorKey: 'remainingToPublish',
    header: ({ column }) => renderSortableHeader(column, 'Остаток к выставлению шт.'),
  },
  {
    accessorKey: 'averageArea',
    header: 'Средняя квадратура',
  },
  {
    accessorKey: 'forecastedBuildingPermits',
    header: ({ column }) => renderSortableHeader(column, 'РнС прогнозный'),
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedBuildingPermits'))}</div>
    ),
  },
  {
    accessorKey: 'firstAuctionStartDate',
    header: ({ column }) => renderSortableHeader(column, 'Старт продаж (1 аукцион)'),
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('firstAuctionStartDate'))}</div>
    ),
  },
  {
    accessorKey: 'forecastedCommissioningDate',
    header: ({ column }) => renderSortableHeader(column, 'Ввод прогнозный'),
    cell: ({ row }) => (
      <div className="text-right font-medium">{formatISODate(row.getValue('forecastedCommissioningDate'))}</div>
    ),
  },
  {
    accessorKey: 'commissioningDatePerPd',
    header: ({ column }) => renderSortableHeader(column, 'Ввод по ПД'),
  },
  {
    accessorKey: 'constructionProgressPercent',
    header: ({ column }) => renderSortableHeader(column, 'Процент строй-готовности'),
  },
  {
    accessorKey: 'liquidityCategory',
    header: ({ column }) => renderSortableHeader(column, 'Ликвидность'),
  },
  {
    accessorKey: 'startingPrice',
    header: ({ column }) => renderSortableHeader(column, 'Стартовая цена'),
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
    header: ({ column }) => renderSortableHeader(column, 'Статус'),
  },
]
