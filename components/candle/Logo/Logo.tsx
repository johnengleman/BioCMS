import Link from 'next/link'
import styles from './styles.module.scss'

// The wordmark with its small wine mark (an arch with a cross).
const Logo = ({ tone = 'ink' }: { tone?: 'ink' | 'light' }) => (
  <Link
    href="/saints"
    className={`${styles.logo} ${tone === 'light' ? styles.light : ''}`}
  >
    <span
      className={styles.mark}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 16 16"
        fill="none"
      >
        <path
          d="M3 15V7a5 5 0 0 1 10 0v8"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
        <path
          d="M8 5.5v6M5.8 7.8h4.4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
    Find a Saint
  </Link>
)

export default Logo
