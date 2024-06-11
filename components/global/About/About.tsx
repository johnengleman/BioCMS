import Image from 'next/image'
import catholicChurch from '../../../public/catholic_church.webp'
import styles from './styles.module.scss'

const About = ({ showImage }) => (
  <div className={styles.about}>
    <div className={styles.text}>
      <p className={styles.heading}>
        Hi, Welcome to FindASaint.com!
      </p>
      <p className={styles.subheading}>
        With this website I have three goals:
      </p>
      <ul>
        <li>
          <span className={styles.bold}>
            1. To Create a Beautiful and User-Friendly
            Platform:
          </span>
          My primary goal is to create an online Iconostasis
          by creating the the most aesthetically pleasing
          and engaging online space dedicated to Christian
          saints. I want to make it easy to discover the
          variety and multitude of these &ldquo;Lights in
          the Darkness&rdquo;.
        </li>
        <li>
          <span className={styles.bold}>
            2. To Deliver In-Depth and Captivating
            Biographies:
          </span>
          Secondly, I want to offer the most comprehensive
          and engaging biographies available online in the
          english language, using sources hundreds of years
          old. My goal is to vividly bring to life the
          remarkable lives of these saints through rich and
          warm storytelling, while providing insightful
          context about the eras they lived in.
        </li>
        <li>
          <span className={styles.bold}>
            3. To Present a Holistic View of Each Saint:
          </span>
          Finally, my third goal is to present a range of
          aspects including their theological teachings,
          influence within the church, authored works,
          documented miracles, relics, and prayers. With
          this multifaceted portrayal, I want to underscore
          their historical significance and enduring
          presence, that they were real individuals with
          lasting impacts rather than legends, and that{' '}
          <span className={styles.underline}>
            they still walk among us.
          </span>
        </li>
      </ul>
    </div>
    <div className={styles.image}>
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
