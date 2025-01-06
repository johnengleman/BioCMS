import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCross } from '@fortawesome/pro-duotone-svg-icons'
import Link from 'next/link'
import Image from 'next/image'
import styles from './styles.module.scss'

const SimilarSaint = ({
  name,
  birth_year,
  death_year,
  profile_image,
  slug,
  categories,
  summary,
}) => {
  return (
    <div className={styles.similarSaint}>
      <Link href={`/saints/${slug}`}>
        <Image
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image?.id}?fit=cover&height=225&width=150`}
          height={225}
          width={150}
          alt={
            profile_image.description ||
            `Image of the orthodox and catholic saint ${name}`
          }
        />
        <div className={styles.personInfo}>
          <div className={styles.dates}>
            <FontAwesomeIcon icon={faCross} />
            <div className={styles.date}>
              {birth_year || '?'}-{death_year || '?'}
            </div>
          </div>
          <p className={styles.name}>{name}</p>
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
          <div className={styles.tags}>
            {categories.map((category, i) => (
              <div
                className={styles.tag}
                key={i}
              >
                {category.replace(/-/g, ' ')}
              </div>
            ))}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default SimilarSaint
