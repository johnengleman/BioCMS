import { useRouter } from 'next/router'
import styles from './styles.module.scss'

const ButtonOrganize = ({
  value,
  setOrganization,
  selected,
}) => {
  const router = useRouter()

  const handleSetOrganization = () => {
    setOrganization(value)

    const newQuery = {
      ...router.query,
    }

    delete newQuery.filter

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
      className={`${styles.btnOrganize} ${
        selected ? styles.selected : ''
      }`}
      onClick={() => handleSetOrganization()}
    >
      {value}
    </button>
  )
}

export default ButtonOrganize
