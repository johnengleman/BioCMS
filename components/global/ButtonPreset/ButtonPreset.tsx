import { useRef } from 'react'
import { flushSync } from 'react-dom'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.scss'

const ButtonPreset = ({ icon, value, count }) => {
  const router = useRouter()
  const selectedPreset =
    router.query.preset || ('none' as any)
  const canUseTransition = useRef<boolean>(false)

  if (typeof window !== 'undefined') {
    canUseTransition.current =
      typeof (document as any)?.startViewTransition ===
      'function'
  }
  const setSaintPreset = (preset) => {
    const newQuery = {
      ...router.query,
      filter: router.query?.filter,
      preset: preset.toLowerCase(),
    }

    if (preset === 'none') {
      delete newQuery.filter
      delete newQuery.preset
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
      className={`${styles.preset} ${
        selectedPreset === value ? styles.active : ''
      }`}
      onClick={() => {
        if (canUseTransition.current) {
          ;(document as any)?.startViewTransition(() => {
            flushSync(() => {
              setSaintPreset(
                selectedPreset !== value ? value : 'none',
              )
            })
          })
        } else {
          setSaintPreset(
            selectedPreset !== value ? value : 'none',
          )
        }
      }}
    >
      <FontAwesomeIcon
        icon={icon}
        style={{
          fontSize: '20px',
          '--fa-primary-color': '#ccad00',
          '--fa-secondary-color': '#ccad00',
        }}
      />
      <h3>
        {value
          .replace(/and/g, '&')
          .replace(/_/g, ' ')
          .replace(/-/g, ' ')}
      </h3>
      <div className={styles.count}>{count}</div>
    </button>
  )
}

export default ButtonPreset
