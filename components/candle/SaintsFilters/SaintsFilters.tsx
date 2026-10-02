'use client'

import { Suspense, type ReactNode } from 'react'
import { useSearchParams } from 'next/navigation'
import { useTradition } from '../../../hooks/useTradition'
import {
  DEFAULT_SAINT_SORT,
  SAINT_MONTHS,
  SAINT_PRESETS,
  SAINT_SORTS,
  saintsHref,
} from '../../../utils/listParams'
import type { Church } from '../../../utils/site'
import type { SaintCounts } from '../../../queries/getSaintCounts'
import FilterPills from '../FilterPills/FilterPills'
import PillMenu from '../PillMenu/PillMenu'
import CategoryIcon from '../CategoryIcon/CategoryIcon'
import { TraditionShowing } from '../TraditionText/TraditionText'

// What the saints list shows. The category is part of the address
// (/saints/category/martyrs, built ahead of time). The tradition is
// kept in the browser. Preset, feast month and sort are ?preset=,
// ?month= and ?sort=, read in the browser, so the page itself is the
// same for everyone.
export type SaintsView = {
  church: Church
  category: string
  preset: string
  month: string
  sort: string
  // The value the list API calls "filter": a category or a month.
  filter: string
  // True when the page's own HTML already has this list.
  isDefault: boolean
}

const EMPTY = new URLSearchParams()

const one = (value: string | null, allowed: string[], fallback: string) =>
  value && allowed.includes(value) ? value : fallback

export const readView = (
  church: Church,
  category: string,
  params: URLSearchParams,
): SaintsView => {
  const preset = category
    ? 'none'
    : one(params.get('preset'), SAINT_PRESETS, 'none')
  const month = category
    ? ''
    : preset !== 'none'
      ? ''
      : one(params.get('month'), SAINT_MONTHS, '')
  const sort = one(params.get('sort'), SAINT_SORTS, DEFAULT_SAINT_SORT)
  return {
    church,
    category,
    preset,
    month,
    sort,
    filter: category || month || 'all',
    isDefault:
      church === 'all' &&
      preset === 'none' &&
      !month &&
      sort === DEFAULT_SAINT_SORT,
  }
}

const Live = ({
  category,
  render,
}: {
  category: string
  render: (view: SaintsView) => ReactNode
}) => {
  const { church } = useTradition()
  const params = useSearchParams()
  return <>{render(readView(church, category, params))}</>
}

// Reads the address parameters in the browser. Until then (and in the
// static HTML) it renders the default view, so nothing is missing from
// the built page.
export const WithSaintsView = ({
  category,
  render,
}: {
  category: string
  render: (view: SaintsView) => ReactNode
}) => {
  const { church } = useTradition()
  return (
    <Suspense
      fallback={render(readView(church, category, EMPTY))}
    >
      <Live
        category={category}
        render={render}
      />
    </Suspense>
  )
}

type Props = {
  category: string
  counts: Record<Church, SaintCounts>
}

const PRESET_LABELS: Record<string, string> = {
  '20th_century_saints': '20th Century',
  patron_saints: 'Patron Saints',
}

// The row of pills on the hero: All, the presets, then every category
// that has saints in the visitor's tradition.
export const SaintsPills = ({
  category,
  counts,
  categories,
}: Props & { categories: { value: string; label: string }[] }) => (
  <WithSaintsView
    category={category}
    render={(view) => {
      const count = counts[view.church]
      const pills = [
        {
          key: 'all',
          label: 'All',
          count: count.total,
          icon: <CategoryIcon name="all" />,
          href: saintsHref({ sort: view.sort }),
          selected:
            !view.category &&
            view.preset === 'none' &&
            !view.month,
        },
        ...Object.keys(PRESET_LABELS).map((preset) => ({
          key: preset,
          label: PRESET_LABELS[preset],
          count: count.presets[preset],
          icon: <CategoryIcon name={preset} />,
          href: saintsHref({ preset, sort: view.sort }),
          selected: view.preset === preset,
        })),
        ...categories
          .filter(
            (c) =>
              (count.filters[c.value] || 0) > 0 ||
              c.value === view.category,
          )
          .map((c) => ({
            key: c.value,
            label: c.label,
            count: count.filters[c.value] || 0,
            icon: <CategoryIcon name={c.value} />,
            href: saintsHref({
              category: c.value,
              sort: view.sort,
            }),
            selected: view.category === c.value,
          })),
      ]
      return (
        <FilterPills
          label="Filter saints"
          pills={pills}
          tone="glass"
        />
      )
    }}
  />
)

const SORT_LABELS: Record<string, string> = {
  'created-newest': 'Newest',
  'created-oldest': 'Oldest added',
  'died-oldest': 'Earliest saints',
  'died-newest': 'Most recent saints',
}

const capital = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

// "12 saints · Showing Catholic saints · Change", and the feast month
// and sort menus.
export const SaintsResultsBar = ({
  category,
  counts,
  className,
  countClassName,
  menusClassName,
}: Props & {
  className?: string
  countClassName?: string
  menusClassName?: string
}) => (
  <WithSaintsView
    category={category}
    render={(view) => {
      const count = counts[view.church]
      const total = view.category
        ? count.filters[view.category] || 0
        : view.month
          ? count.filters[view.month] || 0
          : view.preset !== 'none'
            ? count.presets[view.preset] || 0
            : count.total

      const monthOptions = [
        {
          key: 'any',
          label: 'Any',
          href: saintsHref({ sort: view.sort }),
          selected: !view.month,
        },
        ...SAINT_MONTHS.map((m) => ({
          key: m,
          label: capital(m),
          href: saintsHref({ month: m, sort: view.sort }),
          selected: view.month === m,
        })),
      ]
      const sortOptions = SAINT_SORTS.map((value) => ({
        key: value,
        label: SORT_LABELS[value],
        href: saintsHref({
          category: view.category,
          preset: view.preset,
          month: view.month,
          sort: value,
        }),
        selected: view.sort === value,
      }))

      return (
        <div className={className}>
          <div className={countClassName}>
            <b>
              {total.toLocaleString('en-US')}{' '}
              {total === 1 ? 'saint' : 'saints'}
            </b>
            <span>
              <TraditionShowing />
            </span>
          </div>
          <div className={menusClassName}>
            <PillMenu
              label="Feast"
              options={monthOptions}
            />
            <PillMenu
              label="Sort"
              options={sortOptions}
            />
          </div>
        </div>
      )
    }}
  />
)
