import Link from 'next/link'
import styles from './styles.module.scss'

type Option = {
  key: string
  label: string
  href: string
  selected: boolean
}

// A pill that opens a small menu of links (sort, feast month). Built
// on <details>, so it works without JavaScript. Keyed on the current
// value, so it closes after a choice.
const PillMenu = ({
  label,
  options,
}: {
  label: string
  options: Option[]
}) => {
  const current =
    options.find((o) => o.selected) || options[0]
  return (
    <details
      key={current.key}
      className={styles.menu}
    >
      <summary>
        <span className={styles.label}>{label}:</span>
        {current.label}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden="true"
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </summary>
      <ul>
        {options.map((o) => (
          <li key={o.key}>
            <Link
              href={o.href}
              scroll={false}
              aria-current={o.selected ? 'true' : undefined}
            >
              {o.label}
              {o.selected && (
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  aria-hidden="true"
                >
                  <path d="M5 12l5 5 9-10" />
                </svg>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  )
}

export default PillMenu
