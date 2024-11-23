import SectionTitle from '../SectionTitle/SectionTitle'
import { getRelatedSaints } from '../../../queries/getRelatedSaints'
import SimilarSaintClient from './SimilarSaints.client'
import { getChurch } from '../../../hooks/getChurch'
import styles from './styles.module.scss'

const SimilarSaints = async ({
  searchParams,
  params,
  categories,
}) => {
  const church = await getChurch(searchParams)
  const slug = params.slug

  const relatedSaints = await getRelatedSaints({
    categories: categories.join(),
    church,
    slug,
  })

  if (relatedSaints?.length) {
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
          {relatedSaints?.map((saint, i) => (
            <SimilarSaintClient
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
