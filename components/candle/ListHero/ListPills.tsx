'use client'

import { useTradition } from '../../../hooks/useTradition'
import { listHref, type ListKind } from '../../../utils/listParams'
import type { ListCounts } from '../../../queries/getListCounts'
import FilterPills from '../FilterPills/FilterPills'

// "apostolic_era" -> "Apostolic era"
const label = (value: string) => {
  const text = value.replace(/_/g, ' ')
  return text.charAt(0).toUpperCase() + text.slice(1)
}

// One row of glass filter pills with counts. Each pill is the address
// of a page built ahead of time (/miracles/era/modern_era). Filters with
// no items in the visitor's tradition are left out.
const ListPills = ({
  kind,
  title,
  filter,
  filters,
  counts,
}: {
  kind: ListKind
  title: string
  filter: string
  filters: string[]
  counts: ListCounts
}) => {
  const { church } = useTradition()
  const count = counts[church]

  const pills = filters
    .filter(
      (f) => f === 'all' || f === filter || count[f] > 0,
    )
    .map((f) => ({
      key: f,
      label: f === 'all' ? 'All' : label(f),
      href: listHref(kind, f),
      selected: filter === f,
      count: f === 'all' ? undefined : count[f],
    }))

  if (pills.length < 2) return null
  return (
    <FilterPills
      label={`Filter ${title.toLowerCase()}`}
      pills={pills}
      tone="glass"
    />
  )
}

export default ListPills
