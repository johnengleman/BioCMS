import { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flushSync } from 'react-dom'
import Toggle from '../Toggle/Toggle'
import {
  faCalendarDays,
  faCameraRetro,
  faFire,
  faFamily,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'

const Filter = ({
  setSaintFilter,
  selectedFilter = 'none',
  setSaintPreset,
  selectedPreset = 'none',
  title,
  filters = {},
}) => {
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

    try {
      const data = JSON.parse(cookie)
      setSelectedChurch(data.church)
    } catch (err) {
      console.error(err)
    }
  }, [])

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>Use a preset?</p>
      <div className={styles.presetContainer}>
        <button
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
        </button>
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
        {filters[selectedChurch]?.[selectedPreset]?.map(
          (filter, i) => {
            const selectedF =
              filter?.name.toLowerCase() === selectedFilter
            return (
              <button
                key={i}
                className={`${styles.slide} ${
                  selectedF ? styles.selected : ''
                } ${
                  filter?.count === 0 &&
                  filter?.name !== 'None'
                    ? styles.disabled
                    : ''
                }`}
                onClick={() => {
                  if (canUseTransition.current) {
                    ;(document as any)?.startViewTransition(
                      () => {
                        flushSync(() => {
                          setSaintFilter(
                            !selectedF
                              ? filter?.name
                              : 'none',
                          )
                        })
                      },
                    )
                  } else {
                    setSaintFilter(
                      !selectedF ? filter?.name : 'none',
                    )
                  }
                }}
              >
                <span className={styles.name}>
                  {filter?.name !== 'None'
                    ? filter?.name.replace(/-/g, ' ')
                    : 'All'}
                </span>
                {filter?.count !== 0 && (
                  <div className={styles.count}>
                    {filter?.count}
                  </div>
                )}
              </button>
            )
          },
        )}
      </div>
      <Toggle />
    </div>
  )
}

export default Filter
