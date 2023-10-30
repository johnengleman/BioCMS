import Image from 'next/image'
import catholicChurch from '../../../public/catholic_church.webp'
import styles from './styles.module.scss'

const About = ({ showImage }) => (
  <div className={styles.about}>
    <div className={styles.col}>
      <p className={styles.heading}>
        Hi, Welcome to FindASaint.com
      </p>
      <p className={styles.subheading}>
        When making this site, I had three main goals:
      </p>
      <ul>
        <li>
          <span className={styles.bold}>1.</span> To create
          the most beautiful and engaging website for
          Christian saints to make it easier for the world
          to learn about them.
        </li>
        <li>
          <span className={styles.bold}>2.</span> To create
          more detailed and engaging biographies than any
          other online resource to better bring to life the
          inspiring stories of their lives and give context
          on the world they lived in.
        </li>
        <li>
          <span className={styles.bold}>3.</span> To not
          just tell their biography, but also list their
          theological teachings, church influence, books,
          miracles, relics, churches and prayers to show
          that they were real people, not legendary, and
          that they are still walking among us.
        </li>
      </ul>
    </div>
    <div className={styles.col}>
      {showImage && (
        <Image
          src={catholicChurch}
          alt="Catholic Church"
          width={500}
          height={300}
        />
      )}
    </div>
  </div>
)

export default About
