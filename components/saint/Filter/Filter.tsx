import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Toggle from '../../global/Toggle/Toggle'
import ButtonFilter from '../../global/ButtonFilter/ButtonFilter'
import ButtonPreset from '../../global/ButtonPreset/ButtonPreset'
import ButtonOrganize from '../../global/ButttonOrganize/ButtonOrganize'
import { faCameraRetro } from '@fortawesome/pro-duotone-svg-icons'
import styles from './styles.module.scss'
import { properties } from './properties'

const Filter = ({ filtersCount = {} }) => {
  const [organization, setOrganization] = useState('category');
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
      <p className={styles.instructions}>Use a preset?</p>
      <div className={styles.presetContainer}>
        {properties.presets?.map((preset, i) => (
          <ButtonPreset
            key={i}
            icon={faCameraRetro}
            value={preset}
            count={
              filtersCount[church]?.[preset]?.None[0].count.id
            }
          />
        ))}
      </div>

      <p className={styles.instructions}>Organize by...</p>
      <div className={styles.presetContainer}>
        {properties.organizeBy?.map((value, i) => (
          <ButtonOrganize
            key={i}
            value={value}
            selected={organization === value}
            setOrganization={setOrganization}
          />
        ))}
      </div>

      <p className={styles.instructions}>Add a {organization} filter?</p>
      <div className={styles.slideContainer}>
        {properties.organize?.[organization]?.map((filter, i) => (
          <ButtonFilter
            key={i}
            filter={filter}
            count={
              filtersCount[church]?.[selectedPreset]?.[
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
