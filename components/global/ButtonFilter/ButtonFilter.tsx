import { useRef } from 'react'
import { useRouter } from 'next/router'
import { flushSync } from 'react-dom'
import styles from './styles.module.scss'

const ButtonFilter = ({ count, filter }) => {
  const router = useRouter()
  const selectedFilter = Array.isArray(router.query.filter)
    ? router.query.filter[0]
    : router.query.filter || 'none'

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

    if (filter === 'none') {
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
        count === 0 && filter !== 'None'
          ? styles.disabled
          : ''
      }`}
      onClick={() => {
        if (canUseTransition.current) {
          ;(document as any)?.startViewTransition(() => {
            flushSync(() => {
              setSaintFilter(!isSelected ? filter : 'none')
            })
          })
        } else {
          setSaintFilter(!isSelected ? filter : 'none')
        }
      }}
    >
      <span className={styles.name}>
        {filter !== 'None'
          ? filter.replace(/_/g, ' ').replace(/and/gi, '&')
          : 'All'}
      </span>
      {count !== 0 && filter !== 'None' && (
        <div className={styles.count}>{count}</div>
      )}
    </button>
  )
}

export default ButtonFilter
