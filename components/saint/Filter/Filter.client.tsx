'use client'

import { useRef, useState } from 'react'
import Toggle from '../../global/Toggle/Toggle'
import ButtonFilter from '../../global/ButtonFilter/ButtonFilter'
import ButtonPreset from '../../global/ButtonPreset/ButtonPreset'
import ButtonOrganize from '../../global/ButttonOrganize/ButtonOrganize'
import {
  faCameraRetro,
  faFamily,
  faGrid2,
  faCalendar,
} from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'
import { properties } from '../../../utils/properties'

const Filter = ({
  filtersCount = {},
  selectedPreset,
  church,
}) => {
  const [organization, setOrganization] =
    useState('category')
  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  const getIcon = (preset) => {
    if (preset === '20th_century_saints') {
      return faCameraRetro
    }
    if (preset === 'patron_saints') {
      return faFamily
    }
    if (preset === 'category') {
      return faGrid2
    }
    if (preset === 'month') {
      return faCalendar
    }
  }

  console.log('church', church)
  // console.log('filtersCount', filtersCount)

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>Use a preset?</p>
      <div className={styles.presetContainer}>
        {properties.saints.presets?.map((preset, i) => (
          <ButtonPreset
            key={i}
            icon={getIcon(preset)}
            value={preset}
            count={
              filtersCount[church]?.[preset]?.[
                `all_${preset}`
              ][0].count.id
            }
          />
        ))}
      </div>

      <div className={styles.row}>
        <div className={styles.col}>
          <p className={styles.instructions}>
            1. Organize by...
          </p>
          <div
            className={`${styles.presetContainer} ${styles.organizeContainer}`}
          >
            {properties.saints.organizeBy?.map(
              (value, i) => (
                <ButtonOrganize
                  key={i}
                  value={value}
                  selected={organization === value}
                  setOrganization={setOrganization}
                  icon={getIcon(value)}
                />
              ),
            )}
          </div>
        </div>

        <div className={styles.col}>
          <p className={styles.instructions}>
            2. Add a {organization} filter?
          </p>
          <div className={styles.slideContainer}>
            <ButtonFilter filter="all" />
            {properties.saints.filters?.[organization]?.map(
              (filter, i) => (
                <ButtonFilter
                  key={i}
                  filter={filter}
                  count={
                    filtersCount[church]?.[
                      selectedPreset
                    ]?.[filter]?.[0].count.id
                  }
                />
              ),
            )}
          </div>
        </div>
      </div>

      <Toggle />
    </div>
  )
}

export default Filter
