import Link from 'next/link'
import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import SectionTitle from '../SectionTitle/SectionTitle'
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
      <Link href={slug}>
        <ImageGlobal
          src={`${process.env.NEXT_PUBLIC_DIRECTUS_ASSETS}/assets/${profile_image.id}?fit=cover&height=225&width=150`}
          height="225"
          width="150"
          fill={false}
          alt={
            profile_image.description ||
            `Image of the orthodox and catholic saint ${name}`
          }
        />
        <div className={styles.personInfo}>
          <div className={styles.name}>{name}</div>
          <div className={styles.dates}>
            {birth_year || '?'}-{death_year || '?'}
          </div>
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
          <div
            className={styles.summary}
            dangerouslySetInnerHTML={{
              __html: summary,
            }}
          ></div>
        </div>
      </Link>
    </div>
  )
}

const SimilarSaints = ({ data }) => {
  if (data?.length) {
    return (
      <div className={styles.similarSaints}>
        <SectionTitle
          id="section-similar-saints"
          dataSection="similarSaints"
          border={true}
        >
          Similar Saints
        </SectionTitle>
        <div className={styles.similarSaintsContainer}>
          {data?.map((saint, i) => (
            <SimilarSaint
              key={i}
              {...saint}
            />
          ))}
        </div>
      </div>
    )
  }

  return null
}

export default SimilarSaints
