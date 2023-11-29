import React, { useRef } from 'react'
import { useRouter } from 'next/router'
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
  const selectedFilter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'all'

  const isSelected = selectedFilter === filter.toLowerCase()

  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  const setSaintFilter = (filter) => {
    const newQuery = {
      ...router.query,
      filter: filter.toLowerCase(),
    }

    if (filter === 'all') {
      delete newQuery.filter
    }

    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
    )
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
