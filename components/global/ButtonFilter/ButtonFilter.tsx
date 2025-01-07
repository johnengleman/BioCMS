'use client'

import React, { useRef } from 'react'
import {
  useSearchParams,
  usePathname,
} from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { flushSync } from 'react-dom'
import styles from './styles.module.scss'

type ButtonFilterProps = {
  filter: string
  count?: number
}

const ButtonFilter: React.FC<ButtonFilterProps> = ({
  filter,
  count,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const selectedFilter = searchParams.get('filter') || 'all'

  const isSelected = selectedFilter === filter.toLowerCase()

  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  const setSaintFilter = (filter) => {
    const newSearchParams = new URLSearchParams(
      searchParams.toString(),
    )

    if (filter === 'all') {
      newSearchParams.delete('filter')
    } else {
      newSearchParams.set('filter', filter.toLowerCase())
    }

    router.push(`${pathname}?${newSearchParams.toString()}`)
  }

  return (
    <button
      className={`${styles.slide} ${
        isSelected ? styles.selected : ''
      } ${
        count === 0 && filter !== 'all'
          ? styles.disabled
          : ''
      }`}
      onClick={() => {
        if (canUseTransition.current) {
          ;(document as any)?.startViewTransition(() => {
            flushSync(() => {
              setSaintFilter(!isSelected ? filter : 'all')
            })
          })
        } else {
          setSaintFilter(!isSelected ? filter : 'all')
        }
      }}
    >
      <span className={styles.name}>
        {filter !== 'all'
          ? filter.replace(/_/g, ' ').replace(/and/gi, '&')
          : 'all'}
      </span>
      {count !== 0 && filter !== 'all' && (
        <div className={styles.count}>{count}</div>
      )}
    </button>
  )
}

export default ButtonFilter
