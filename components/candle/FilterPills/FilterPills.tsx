import { ReactNode } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

export type Pill = {
  key: string
  label: string
  href: string
  selected: boolean
  count?: number
  icon?: ReactNode
}

// One row of filter pills (links). On phones the row scrolls sideways.
// `tone="glass"` is for a row that sits on a hero photo. `wrap` lets the
// pills flow onto more lines instead, so none is hidden. `after` goes
// at the end of the row (a button, for example).
const FilterPills = ({
  pills,
  label,
  tone = 'light',
  wrap = false,
  after,
}: {
  pills: Pill[]
  label: string
  tone?: 'light' | 'glass'
  wrap?: boolean
  after?: ReactNode
}) => (
  <nav
    className={`${styles.pills} ${tone === 'glass' ? styles.glass : ''} ${wrap ? styles.wrap : ''}`}
    aria-label={label}
  >
    {pills.map((pill) => (
      <Link
        key={pill.key}
        href={pill.href}
        scroll={false}
        className={
          pill.selected ? styles.selected : undefined
        }
        aria-current={pill.selected ? 'true' : undefined}
      >
        {pill.icon && (
          <span
            className={styles.icon}
            aria-hidden="true"
          >
            {pill.icon}
          </span>
        )}
        {pill.label}
        {typeof pill.count === 'number' && (
          <em className={styles.count}>
            {pill.count.toLocaleString('en-US')}
          </em>
        )}
      </Link>
    ))}
    {after}
  </nav>
)

export default FilterPills
