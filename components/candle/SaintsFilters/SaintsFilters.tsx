'use client'

import { Suspense, useId, useState, type ReactNode } from 'react'
import Link from 'next/link'
import { LuChevronDown, LuX } from 'react-icons/lu'
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
import styles from './styles.module.scss'

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

const SORT_LABELS: Record<string, string> = {
  'created-newest': 'Newest',
  'created-oldest': 'Oldest added',
  'died-oldest': 'Earliest saints',
  'died-newest': 'Most recent saints',
}

const capital = (value: string) =>
  value.charAt(0).toUpperCase() + value.slice(1)

// The saints filters: a short row of quick pills (All, Feast today, the
// presets), the chosen category or month as a pill you can clear, and
// "More filters", which opens one panel with every category and the
// twelve feast months. Nothing scrolls or hides off screen. Sort is
// plain text on the right, so it does not look like a filter.
export const SaintsFilterBar = ({
  category,
  counts,
  categories,
  todays,
  builtOn,
}: Props & {
  categories: { value: string; label: string }[]
  // Saints with a feast near today, and the day the page was built.
  todays: FeastSaint[]
  builtOn: Day
}) => {
  const today = useToday(builtOn)
  const [open, setOpen] = useState(false)
  const panelId = useId()

  return (
    <WithSaintsView
      category={category}
      render={(view) => {
        const count = counts[view.church]
        const feasts = feastsOn(todays, view.church, today).length
        const chosen = view.category
          ? categories.find((c) => c.value === view.category)?.label ||
            view.category
          : view.month
            ? capital(view.month)
            : ''

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
          // The category or month chosen in the panel; selecting it
          // again clears it.
          ...(chosen
            ? [
                {
                  key: 'chosen',
                  label: chosen,
                  icon: <LuX aria-label="Clear" />,
                  href: saintsHref({ sort: view.sort }),
                  selected: true,
                },
              ]
            : []),
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
          <div className={styles.bar}>
            <div className={styles.top}>
              <FilterPills
                label="Filter saints"
                pills={pills}
                wrap
                after={
                  <button
                    type="button"
                    className={`${styles.more} ${open ? styles.open : ''}`}
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen(!open)}
                  >
                    More filters
                    <LuChevronDown aria-hidden="true" />
                  </button>
                }
              />
              <PillMenu
                label="Sort by"
                variant="text"
                options={sortOptions}
              />
            </div>

            {open && (
              <div
                id={panelId}
                className={styles.panel}
              >
                <h3>Category</h3>
                <ul className={styles.categories}>
                  {categories.map((c) => {
                    const n = count.filters[c.value] || 0
                    return (
                      <li key={c.value}>
                        <Link
                          href={saintsHref({
                            category: c.value,
                            sort: view.sort,
                          })}
                          scroll={false}
                          onClick={() => setOpen(false)}
                          aria-current={
                            view.category === c.value ? 'true' : undefined
                          }
                          className={n ? undefined : styles.empty}
                        >
                          <CategoryIcon name={c.value} />
                          {c.label}
                          {n > 0 && <em>{n.toLocaleString('en-US')}</em>}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
                <h3>Feast day in</h3>
                <ul className={styles.months}>
                  {SAINT_MONTHS.map((m) => (
                    <li key={m}>
                      <Link
                        href={saintsHref({ month: m, sort: view.sort })}
                        scroll={false}
                        onClick={() => setOpen(false)}
                        aria-current={
                          view.month === m ? 'true' : undefined
                        }
                        aria-label={capital(m)}
                      >
                        {capital(m).slice(0, 3)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )
      }}
    />
  )
}
