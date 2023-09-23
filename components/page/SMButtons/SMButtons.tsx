import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './styles.module.scss'
import {
  faSquareXTwitter,
  faSquareFacebook,
} from '@fortawesome/free-brands-svg-icons'

const SMButtons = ({ transparent }) => (
  <div className={styles.socialMediaButtons}>
    <Link href="https://twitter.com/findasaint">
      <div className={styles.buttons}>
        <FontAwesomeIcon
          icon={faSquareXTwitter}
          style={{
            color: transparent ? '#ffffff' : '#ccad00',
            fontSize: '35px',
          }}
        />
      </div>
    </Link>
    <Link href="https://www.facebook.com/groups/findasaint">
      <div className={styles.buttons}>
        <FontAwesomeIcon
          icon={faSquareFacebook}
          style={{
            color: transparent ? '#ffffff' : '#ccad00',
            fontSize: '35px',
          }}
        />
      </div>
    </Link>
  </div>
)

export default SMButtons
