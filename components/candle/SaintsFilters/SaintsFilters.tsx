'use client'

import { Suspense, type ReactNode } from 'react'
import {
  LuArrowUpDown,
  LuCalendarDays,
  LuChurch,
} from 'react-icons/lu'
import { useSearchParams } from 'next/navigation'
import { useTradition } from '../../../hooks/useTradition'
import { useToday } from '../../../hooks/useToday'
import { feastsOn, type Day } from '../../../utils/feasts'
import {
  DEFAULT_SAINT_SORT,
  SAINT_MONTHS,
  SAINT_PRESETS,
  SAINT_SORTS,
  saintsHref,
} from '../../../utils/listParams'
import type { Church } from '../../../utils/site'
import type { FeastSaint } from '../../../queries/getTodaysFeast'
import type { SaintCounts } from '../../../queries/getSaintCounts'
import FilterPills from '../FilterPills/FilterPills'
import PillMenu from '../PillMenu/PillMenu'
import CategoryIcon from '../CategoryIcon/CategoryIcon'

// What the saints list shows. The category is part of the address
// (/saints/category/martyrs, built ahead of time). The tradition is
// kept in the browser. Feast today, preset, feast month and sort are
// ?feast=today, ?preset=, ?month= and ?sort=, read in the browser, so
// the page itself is the same for everyone.
export type SaintsView = {
  church: Church
  category: string
  preset: string
  month: string
  sort: string
  // Only saints whose feast is today (the list comes with the page).
  feast: boolean
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
  const feast = !category && params.get('feast') === 'today'
  const preset =
    category || feast
      ? 'none'
      : one(params.get('preset'), SAINT_PRESETS, 'none')
  const month =
    category || feast
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
    feast,
    filter: category || month || 'all',
    isDefault:
      !feast &&
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

// The row of filter pills: All, Feast today, the presets, then every
// category that has saints in the visitor's tradition.
export const SaintsPills = ({
  category,
  counts,
  categories,
  todays,
  builtOn,
  tone = 'glass',
}: Props & {
  categories: { value: string; label: string }[]
  // Saints with a feast near today, and the day the page was built.
  todays: FeastSaint[]
  builtOn: Day
  tone?: 'light' | 'glass'
}) => {
  const today = useToday(builtOn)
  return (
    <WithSaintsView
      category={category}
      render={(view) => {
        const count = counts[view.church]
        const feasts = feastsOn(todays, view.church, today).length
        const pills = [
          {
            key: 'all',
            label: 'All',
            count: count.total,
            icon: <CategoryIcon name="all" />,
            href: saintsHref({ sort: view.sort }),
            selected:
              !view.category &&
              !view.feast &&
              view.preset === 'none' &&
              !view.month,
          },
          ...(feasts > 0 || view.feast
            ? [
                {
                  key: 'feast_today',
                  label: 'Feast today',
                  count: feasts,
                  icon: <CategoryIcon name="feast_today" />,
                  href: saintsHref({ feast: true, sort: view.sort }),
                  selected: view.feast,
                },
              ]
            : []),
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
            tone={tone}
          />
        )
      }}
    />
  )
}

const SORT_LABELS: Record<string, string> = {
  'created-newest': 'Newest',
  'created-oldest': 'Oldest added',
  'died-oldest': 'Earliest saints',
  'died-newest': 'Most recent saints',
}

const capital = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

const TRADITIONS: { value: Church; label: string }[] = [
  { value: 'all', label: 'Both' },
  { value: 'catholic', label: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox' },
]

// The tradition, feast month and sort menus.
export const SaintsMenus = ({
  category,
  className,
}: {
  category: string
  className?: string
}) => {
  const { setChurch } = useTradition()
  return (
    <WithSaintsView
      category={category}
      render={(view) => {
        const traditionOptions = TRADITIONS.map((t) => ({
          key: t.value,
          label: t.label,
          onSelect: () => setChurch(t.value),
          selected: view.church === t.value,
        }))
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
            feast: view.feast,
            sort: value,
          }),
          selected: view.sort === value,
        }))

        return (
          <div className={className}>
            <PillMenu
              label="Tradition"
              icon={<LuChurch />}
              options={traditionOptions}
            />
            <PillMenu
              label="Feast"
              icon={<LuCalendarDays />}
              options={monthOptions}
            />
            <PillMenu
              label="Sort"
              icon={<LuArrowUpDown />}
              options={sortOptions}
            />
          </div>
        )
      }}
    />
  )
}
