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
  { value: 'catholic', label: 'Catholic' },
  { value: 'orthodox', label: 'Orthodox' },
  { value: 'all', label: 'All' },
]

// Segmented control for the visitor's tradition. Saves the choice in
// the same cookie that hooks/getChurch.ts reads on the server.
const TraditionControl = ({
  church,
}: {
  church: string
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
    router.replace(`${pathname}?${params.toString()}`)
  }

  return (
    <div
      className={styles.control}
      role="radiogroup"
      aria-label="Tradition"
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
          {option.label}
        </button>
      ))}
    </div>
  )
}

export default TraditionControl
