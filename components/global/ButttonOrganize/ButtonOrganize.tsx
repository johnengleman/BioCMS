'use client'

import {
  useSearchParams,
  usePathname,
} from 'next/navigation'
import { useRouter } from 'next-nprogress-bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      <FontAwesomeIcon
        icon={icon}
        style={{
          fontSize: '15px',
          '--fa-primary-color': '#ccad00',
          '--fa-secondary-color': '#ccad00',
        }}
      />
      {value}
    </button>
  )
}

export default ButtonOrganize
