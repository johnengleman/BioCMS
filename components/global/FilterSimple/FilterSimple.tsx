import { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/router'
import Toggle from '../Toggle/Toggle'
import styles from './styles.module.scss'
import { properties } from './properties'

const FilterSimple = ({ filtersCount = {}, sort }) => {
  const router = useRouter()
  const selectedFilter = router.query.filter || 'none'
  const selectedPreset =
    router.query.preset || ('none' as any)
  const church = router.query.church || 'all'
  const canUseTransition = useRef<boolean>(false)
  const [selectedChurch, setSelectedChurch] =
    useState('all')

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  useEffect(() => {
    const cookie = Cookies.get('findasaint.com')

    if (cookie) {
      try {
        const data = JSON.parse(cookie)
        setSelectedChurch(data.church)
      } catch (err) {
        console.error(err)
      }
    }
  }, [church])

  const setSaintFilter = (filter) => {
    const newQuery = {
      ...router.query,
      filter: filter.toLowerCase(),
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
    <div className={styles.filter}>
      <p className={styles.instructions}>
        Filter by Time Period?
      </p>
      <div className={styles.slideContainer}>
        {properties.filters?.map((filter, i) => {
          const selectedF =
            filter?.toLowerCase() === selectedFilter
          const count =
            filtersCount[selectedChurch]?.[
              selectedPreset
            ]?.[filter]?.[0].count.id

          return (
            <button
              key={i}
              className={`${styles.slide} ${
                selectedF ? styles.selected : ''
              } ${
                count === 0 && filter !== 'None'
                  ? styles.disabled
                  : ''
              }`}
              onClick={() => {
                if (canUseTransition.current) {
                  ;(document as any)?.startViewTransition(
                    () => {
                      flushSync(() => {
                        setSaintFilter(
                          !selectedF ? filter : 'none',
                        )
                      })
                    },
                  )
                } else {
                  setSaintFilter(
                    !selectedF ? filter : 'none',
                  )
                }
              }}
            >
              <span className={styles.name}>
                {filter !== 'None'
                  ? filter.replace(/_/g, ' ')
                  : 'All'}
              </span>
              {count !== 0 && (
                <div className={styles.count}>{count}</div>
              )}
            </button>
          )
        })}
      </div>
      {sort && <Toggle />}
    </div>
  )
}

export default FilterSimple
