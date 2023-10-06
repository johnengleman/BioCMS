import { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/router'
import Toggle from '../Toggle/Toggle'
import {
  faCalendarDays,
  faCameraRetro,
  faFire,
  faFamily,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'
import { properties } from '../../../properties'

type presetTypes = ['none', 'patron', '20th-century-saints']

const Filter = ({ filtersCount = {} }) => {
  const router = useRouter()
  const selectedFilter = router.query.filter || 'none'
  const selectedPreset =
    router.query.preset || ('none' as any)
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
  }, [])

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
      { shallow: true },
    )
  }

  const setSaintPreset = (preset) => {
    const newQuery = {
      ...router.query,
      preset: preset.toLowerCase(),
    }
    router.push(
      {
        pathname: router.pathname,
        query: newQuery,
      },
      undefined,
      { shallow: true },
    )
  }

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>Use a preset?</p>
      <div className={styles.presetContainer}>
        {/* <button
          className={`${styles.preset} ${
            selectedPreset === 'patron' ? styles.active : ''
          }`}
          onClick={() => {
            if (canUseTransition.current) {
              ;(document as any)?.startViewTransition(
                () => {
                  flushSync(() => {
                    setSaintPreset(
                      selectedPreset !== 'patron'
                        ? 'patron'
                        : 'none',
                    )
                  })
                },
              )
            } else {
              setSaintPreset(
                selectedPreset !== 'patron'
                  ? 'patron'
                  : 'none',
              )
            }
          }}
        >
          <h3>Patron Saints</h3>
          <FontAwesomeIcon
            icon={faFamily}
            style={{
              fontSize: '20px',
              '--fa-primary-color': '#ccad00',
              '--fa-secondary-color': '#ccad00',
            }}
          />
        </button> */}
        {/* <div className="bento">
          <h3>Top 100 Most Popular</h3>
          <FontAwesomeIcon
            icon={faFire}
            style={{
              fontSize: '20px',
              '--fa-primary-color': '#ccad00',
              '--fa-secondary-color': '#ccad00',
            }}
          />
        </div> */}
        <button
          className={`${styles.preset} ${
            selectedPreset === '20th-century-saints'
              ? styles.active
              : ''
          }`}
          onClick={() => {
            if (canUseTransition.current) {
              ;(document as any)?.startViewTransition(
                () => {
                  flushSync(() => {
                    setSaintPreset(
                      selectedPreset !==
                        '20th-century-saints'
                        ? '20th-century-saints'
                        : 'none',
                    )
                  })
                },
              )
            } else {
              setSaintPreset(
                selectedPreset !== '20th-century-saints'
                  ? '20th-century-saints'
                  : 'none',
              )
            }
          }}
        >
          <h3>20th Century Saints</h3>
          <FontAwesomeIcon
            icon={faCameraRetro}
            style={{
              fontSize: '20px',
              '--fa-primary-color': '#ccad00',
              '--fa-secondary-color': '#ccad00',
            }}
          />
        </button>
        {/* <button
          className={`${styles.preset} ${
            selectedPreset === 'saints-by-months'
              ? styles.active
              : ''
          }`}
          onClick={() => {
            if (canUseTransition.current) {
              ;(document as any)?.startViewTransition(
                () => {
                  flushSync(() => {
                    setSaintPreset(
                      selectedPreset !== 'saints-by-months'
                        ? 'saints-by-months'
                        : 'none',
                    )
                  })
                },
              )
            } else {
              setSaintPreset(
                selectedPreset !== 'saints-by-months'
                  ? 'saints-by-months'
                  : 'none',
              )
            }
          }}
        >
          <h3>Saints by Months</h3>
          <FontAwesomeIcon
            icon={faCalendarDays}
            style={{
              fontSize: '20px',
              '--fa-primary-color': '#ccad00',
              '--fa-secondary-color': '#ccad00',
            }}
          />
        </button> */}
      </div>

      <p className={styles.instructions}>Add a filter?</p>
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
      <Toggle />
    </div>
  )
}

export default Filter
