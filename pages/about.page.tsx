import Head from 'next/head'
import Page from '../components/page/Page/Page'
import styles from './styles.module.scss'
import Image from 'next/image'
import catholicChurch from './../public/catholic_church.webp'

const About = () => {
  return (
    <>
      <Head>
        <title>
          Browse and discover all the Catholic Saints:
          Spiritual Biographies, Teachings, Sayings,
          Miracles Books, and Quotes
        </title>
        <meta
          key="description"
          name="description"
          content="Explore the lives and legacies of Catholic saints. From teachings to miracles, delve into their spiritual journeys."
        />
        <meta
          name="keywords"
          content="Roman Catholic, Eastern Orthodox saints, spiritual journeys, miracles, teachings, holy figures, books, Orthodox literature, religious sayings, saintly quotes, Orthodox teachings, church history, faith, spirituality, Christianity"
        />
      </Head>
      <Page spaceBetween={true}>
        <div className={styles.about}>
          <div className={styles.col}>
            <p className={styles.heading}>
              Hi, welcome to FindASaint.com
            </p>
            <p className={styles.subheading}>
              When making this site, I had three main goals:
            </p>
            <ul>
              <li>
                <span className={styles.bold}>1.</span> To
                create the most beautiful and engaging
                website for Christian saints to make it
                easier for the world to learn about them.
              </li>
              <li>
                <span className={styles.bold}>2.</span> To
                create more detailed and engaging
                biographies than any other online resource
                to better bring to life the inspiring
                stories of their lives and give context on
                the world they lived in.
              </li>
              <li>
                <span className={styles.bold}>3.</span> To
                not just tell their biography, but also list
                their theological teachings, church
                influence, books, miracles, relics, churches
                and prayers to show that they were real
                people, not legendary, and that they are
                still walking among us.
              </li>
            </ul>
            <p>
              If you have suggestions on how I could better
              meet these goals,{' '}
              <a href="mailto:mail@findasaint.com">
                <button className={styles.contactBtn}>
                  send me a message.
                </button>
              </a>
              I&apos;d love to hear your thoughts.
            </p>
          </div>
          <div className={styles.col}>
            <Image
              src={catholicChurch}
              alt="Catholic Church"
              width={500}
              height={300}
            />
          </div>
        </div>
      </Page>
    </>
  )
}

export default About
