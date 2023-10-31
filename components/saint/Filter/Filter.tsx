import { useRef, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import Toggle from '../../global/Toggle/Toggle'
import ButtonFilter from '../../global/ButtonFilter/ButtonFilter'
import ButtonPreset from '../../global/ButtonPreset/ButtonPreset'
import { faCameraRetro } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'
import { properties } from './properties'

const Filter = ({ filtersCount = {} }) => {
  const router = useRouter()
  const selectedPreset =
    router.query.preset || ('none' as any)
  const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
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

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>Use a preset?</p>
      <div className={styles.presetContainer}>
        {properties.presets?.map((preset, i) => (
          <ButtonPreset
            key={i}
            icon={faCameraRetro}
            value={preset}
            count={
              filtersCount[church][preset]?.None[0].count.id
            }
          />
        ))}
      </div>

      <p className={styles.instructions}>Add a filter?</p>
      <div className={styles.slideContainer}>
        {properties.filters?.map((filter, i) => (
          <ButtonFilter
            key={i}
            filter={filter}
            count={
              filtersCount[church][selectedPreset]?.[
                filter
              ]?.[0].count.id
            }
          />
        ))}
      </div>
      <Toggle />
    </div>
  )
}

export default Filter
