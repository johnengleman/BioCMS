import Link from 'next/link'
import {
  FaTwitterSquare,
  FaFacebookSquare,
} from 'react-icons/fa'
import styles from './styles.module.scss'

const SMButtons = ({ transparent }) => (
  <div className={styles.socialMediaButtons}>
    <Link href="https://twitter.com/findasaint">
      <div className={styles.buttons}>
        <FaTwitterSquare
          style={{
            color: transparent ? '#ffffff' : '#ccad00',
            fontSize: '35px',
          }}
        />
      </div>
    </Link>
    <Link href="https://www.facebook.com/groups/findasaint">
      <div className={styles.buttons}>
        <FaFacebookSquare
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
