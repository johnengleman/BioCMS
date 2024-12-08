'use client'

import { useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Toggle from '../Toggle/Toggle'
import styles from './styles.module.scss'
import ButtonFilter from '../ButtonFilter/ButtonFilter'
import { properties } from '../../../utils/properties'

const FilterSimple = ({
  filtersCount,
  sort,
  church,
  type = 'teachings',
}) => {
  const searchParams = useSearchParams()
  const preset = searchParams?.get('preset') || 'none'
  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  return (
    <div className={styles.filter}>
      <div className={styles.slideContainer}>
        {properties?.[type]?.filters.map((filter, i) => {
          const count =
            filtersCount[church]?.[preset]?.[filter]?.[0]
              .count.id

          return (
            <ButtonFilter
              key={i}
              count={count}
              filter={filter}
            />
          )
        })}
      </div>
      {sort && <Toggle />}
    </div>
  )
}

export default FilterSimple
