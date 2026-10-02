'use client'

import { useTradition } from '../../../hooks/useTradition'
import type { Church } from '../../../utils/site'
import styles from './styles.module.scss'

const OPTIONS: { value: Church; label: string; short: string }[] = [
  { value: 'all', label: 'Both traditions', short: 'Both' },
  { value: 'catholic', label: 'Catholic', short: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox', short: 'Orthodox' },
]

// Segmented control for the visitor's tradition. It lives in the site
// footer and applies to every page. The choice is saved in the browser
// (hooks/useTradition.ts); no page is rendered on the server for it.
const TraditionControl = ({
  tone = 'light',
}: {
  tone?: 'light' | 'dark'
}) => {
  const { church, setChurch } = useTradition()

  return (
    <div
      className={`${styles.control} ${tone === 'dark' ? styles.dark : ''}`}
      role="radiogroup"
      aria-label="Show saints from"
    >
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={church === option.value}
          className={
            church === option.value ? styles.selected : ''
          }
          onClick={() => setChurch(option.value)}
        >
          <span className={styles.long}>{option.label}</span>
          <span className={styles.short}>{option.short}</span>
        </button>
      ))}
    </div>
  )
}

export default TraditionControl
