import Link from 'next/link'
import styles from './styles.module.scss'

const ReadMoreLinks = ({ links }) => {
  if (links?.length) {
    return (
      <div className={styles.readMoreLinks}>
        <div className={styles.title}>Read More</div>
        <div className={styles.links}>
          {links?.map((link, i) => {
            return link.link ? (
              <Link
                key={i}
                href={link.link}
                className={styles.link}
              >
                {link.text}
              </Link>
            ) : (
              <p key={i}>{link.text}</p>
            )
          })}
        </div>
      </div>
    )
  }
  return null
}

export default ReadMoreLinks
