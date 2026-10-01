import Link from 'next/link'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

// A page section with an Apple-style heading and an optional link
// on the right ("View all chapters ›").
const Section = ({
  id,
  title,
  link,
  children,
}: {
  id: string
  title: string
  link?: { href: string; label: string }
  children: ReactNode
}) => (
  <section
    className={styles.section}
    aria-labelledby={id}
  >
    <div className={styles.header}>
      <h2 id={id}>{title}</h2>
      {link && (
        <Link
          href={link.href}
          className={styles.link}
        >
          {link.label}
          <span aria-hidden="true"> ›</span>
        </Link>
      )}
    </div>
    {children}
  </section>
)

export default Section
