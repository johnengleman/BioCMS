import type { ReactNode } from 'react'
import Link from 'next/link'
import styles from './styles.module.scss'

type Option = {
  key: string
  label: string
  // A link, or a button when the choice is kept in the browser.
  href?: string
  onSelect?: () => void
  selected: boolean
}

// A pill that opens a small menu of links (sort, feast month). Built
// on <details>, so it works without JavaScript. Keyed on the current
// value, so it closes after a choice.
// `icon` stands in for the label on narrow phones, so a row of menus
// fits the screen.
const PillMenu = ({
  label,
  options,
  icon,
  variant = 'pill',
}: {
  label: string
  options: Option[]
  icon?: ReactNode
  // 'text': plain words with a chevron, for controls that are not
  // filters (sort), so they do not look like the filter pills.
  variant?: 'pill' | 'text'
}) => {
  const current =
    options.find((o) => o.selected) || options[0]
  return (
    <details
      key={current.key}
      className={`${styles.menu} ${variant === 'text' ? styles.text : ''}`}
    >
      <summary aria-label={`${label}: ${current.label}`}>
        {icon && (
          <span
            className={styles.icon}
            aria-hidden="true"
          >
            {icon}
          </span>
        )}
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
            {o.href ? (
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
            ) : (
              <button
                type="button"
                onClick={o.onSelect}
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
              </button>
            )}
          </li>
        ))}
      </ul>
    </details>
  )
}

export default PillMenu
