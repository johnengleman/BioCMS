'use client'

import React from 'react'
import {
  useSearchParams,
  usePathname,
} from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import styles from './styles.module.scss'

const ButtonOrganize = ({
  value,
  setOrganization,
  selected,
  icon,
}) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  const handleSetOrganization = () => {
    setOrganization(value)

    const newSearchParams = new URLSearchParams(
      searchParams.toString(),
    )

    newSearchParams.delete('filter')

    router.push(`${pathname}/${newSearchParams.toString()}`)
  }

  return (
    <button
      className={`${styles.btnOrganize} ${
        selected ? styles.selected : ''
      }`}
      onClick={() => handleSetOrganization()}
    >
      {icon &&
        React.createElement(icon, {
          size: 15,
          style: {
            color: '#ccad00',
          },
        })}
      {value}
    </button>
  )
}

export default ButtonOrganize
