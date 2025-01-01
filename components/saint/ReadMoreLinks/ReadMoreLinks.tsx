import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBook } from '@fortawesome/pro-regular-svg-icons'
import styles from './styles.module.scss'

const ReadMoreLinks = ({ links, type }) => {
  const booksLinks = links?.filter((link) =>
    link.type?.includes(type),
  )

  if (booksLinks?.length) {
    return (
      <div className={styles.readMoreLinks}>
        <div className={styles.title}>Read More</div>
        <div className={styles.links}>
          {booksLinks
            .sort((a, b) =>
              a.author.localeCompare(b.author, 'en', {
                sensitivity: 'base',
              }),
            )
            .map((link, i) => {
              return link.store_link ? (
                <Link
                  key={i}
                  href={link.store_link}
                  className={styles.link}
                >
                  {link.author} ({link.year}).{' '}
                  <span className={styles.italics}>
                    {link.title}
                  </span>
                  . {link.publisher}
                  <FontAwesomeIcon icon={faBook} />
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
