'use client'

import { useState } from 'react'
import Cookies from 'js-cookie'
import {
  usePathname,
  useSearchParams,
} from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import styles from './styles.module.scss'

const OPTIONS = [
  { value: 'all', label: 'Both traditions', short: 'Both' },
  { value: 'catholic', label: 'Catholic', short: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox', short: 'Orthodox' },
]

// Segmented control for the visitor's tradition. It lives in the site
// footer and applies to every page. It saves the choice in the same
// cookie that hooks/getChurch.ts reads on the server, and adds
// ?church= so the page re-renders without scrolling.
const TraditionControl = ({
  church,
  tone = 'light',
}: {
  church: string
  tone?: 'light' | 'dark'
}) => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [selected, setSelected] = useState(church)

  const choose = (value: string) => {
    if (value === selected) return
    setSelected(value)
    Cookies.set(
      'findasaint.com',
      JSON.stringify({ church: value }),
      {
        expires: 365,
        path: '/',
        sameSite: 'Lax',
      },
    )
    const params = new URLSearchParams(
      searchParams.toString(),
    )
    params.set('church', value)
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    })
  }

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
          aria-checked={selected === option.value}
          className={
            selected === option.value ? styles.selected : ''
          }
          onClick={() => choose(option.value)}
        >
          <span className={styles.long}>{option.label}</span>
          <span className={styles.short}>{option.short}</span>
        </button>
      ))}
    </div>
  )
}

export default TraditionControl
