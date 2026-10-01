import Link from 'next/link'
import styles from './styles.module.scss'

export type Pill = {
  key: string
  label: string
  href: string
  selected: boolean
}

// One row of filter pills (links). On phones the row scrolls sideways.
const FilterPills = ({
  pills,
  label,
}: {
  pills: Pill[]
  label: string
}) => (
  <nav
    className={styles.pills}
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
        {pill.label}
      </Link>
    ))}
  </nav>
)

export default FilterPills
