import { useRef } from 'react'
import { useRouter } from 'next/router'
import Toggle from '../Toggle/Toggle'
import styles from './styles.module.scss'
import ButtonFilter from '../ButtonFilter/ButtonFilter'
import { properties } from './properties'

const FilterSimple = ({ filtersCount = {}, sort }) => {
  const router = useRouter()
  const selectedPreset =
    router.query.preset || ('none' as any)
    const church = Array.isArray(router.query.church)
    ? router.query.church[0]
    : router.query.church || 'all'
  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }

  return (
    <div className={styles.filter}>
      <p className={styles.instructions}>
        Filter by Time Period?
      </p>
      <div className={styles.slideContainer}>
        {properties.filters?.map((filter, i) => {
          const count =
            filtersCount[church]?.[
              selectedPreset
            ]?.[filter]?.[0].count.id

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
