import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.scss'

const ButtonOrganize = ({
  value,
  setOrganization,
  selected,
  icon,
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
