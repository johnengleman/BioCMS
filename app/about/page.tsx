import type { Metadata } from 'next'
import Link from 'next/link'
import SiteHeader from '../../components/candle/SiteHeader/SiteHeader'
import SiteFooter from '../../components/candle/SiteFooter/SiteFooter'
import PhotoHero from '../../components/candle/PhotoHero/PhotoHero'
import styles from './candle.module.scss'

import { NextPageProps } from '../../types/nextjs'

export const runtime = 'edge'

export const metadata: Metadata = {
  title: 'About Find a Saint',
  description:
    'Why Find a Saint exists: beautiful, in-depth lives of the Catholic and Orthodox saints, with their teachings, miracles, relics and prayers.',
}

const GOALS = [
  {
    title: 'A beautiful place to meet the saints',
    text: (
      <>
        My first goal is to create an online iconostasis:
        the most beautiful and engaging space on the web for
        the Christian saints. I want to make it easy to
        discover the variety and multitude of these
        &ldquo;Lights in the Darkness.&rdquo;
      </>
    ),
  },
  {
    title: 'Lives worth reading',
    text: (
      <>
        Second, I want to offer the most complete and
        engaging biographies in the English language, drawn
        from sources hundreds of years old. Each life should
        come alive, with the context of the age the saint
        lived in.
      </>
    ),
  },
  {
    title: 'The whole saint',
    text: (
      <>
        Third, I want to show every part of a saint: their
        teachings, their influence in the Church, their
        writings, documented miracles, relics and prayers.
        They were real people with lasting influence, not
        legends.
      </>
    ),
  },
]

const About = async (props: NextPageProps) => {
  const searchParams = await props.searchParams
  return (
    <div className={styles.page}>
      <SiteHeader
        searchParams={searchParams}
        active="/about"
      />
      <main>
        <PhotoHero align="center">
          <p className={styles.eyebrow}>About</p>
          <h1 className={styles.title}>
            Welcome to Find a Saint
          </h1>
          <p className={styles.subtitle}>
            This website has three goals.
          </p>
        </PhotoHero>

        <div className={styles.content}>
          <ol className={styles.goals}>
            {GOALS.map((goal, i) => (
              <li
                key={goal.title}
                className={styles.goal}
              >
                <span
                  className={styles.number}
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <h2>{goal.title}</h2>
                <p>{goal.text}</p>
              </li>
            ))}
          </ol>

          <p className={styles.closing}>
            The saints still walk among us.
          </p>
          <div className={styles.actions}>
            <Link
              href="/saints"
              className={styles.primary}
            >
              Meet the saints
            </Link>
            <Link
              href="/updates"
              className={styles.link}
            >
              See recent updates
              <span aria-hidden="true"> ›</span>
            </Link>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export default About
