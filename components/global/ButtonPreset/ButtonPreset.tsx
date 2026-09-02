'use client'

import React from 'react'
import { flushSync } from 'react-dom'
import {
  useSearchParams,
  usePathname,
} from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import styles from './styles.module.scss'

const ButtonPreset = ({ icon, value, count }) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const selectedPreset = searchParams.get('preset')
  const setSaintPreset = (preset) => {
    const newSearchParams = new URLSearchParams(
      searchParams.toString(),
    )

    if (preset === 'none') {
      newSearchParams.delete('preset')
      newSearchParams.delete('filter')
    } else {
      newSearchParams.set('preset', preset.toLowerCase())
    }

    // Combine current path with search params if they exist
    router.push(
      `${pathname}${
        newSearchParams.toString()
          ? `?${newSearchParams.toString()}`
          : ''
      }`,
    )
  }

  return (
    <button
      className={`${styles.preset} ${
        selectedPreset === value ? styles.active : ''
      }`}
      onClick={() => {
        if (typeof document.startViewTransition === 'function') {
          document.startViewTransition(() => {
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
      {icon &&
        React.createElement(icon, {
          size: 20,
          style: {
            color: '#ccad00',
          },
        })}
      {value
        .replace(/and/g, '&')
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')}
      <div className={styles.count}>{count}</div>
    </button>
  )
}

export default ButtonPreset
