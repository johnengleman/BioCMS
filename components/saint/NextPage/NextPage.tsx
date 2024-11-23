'use client'

import Link from 'next/link'
import styles from './styles.module.scss'
import { useParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import PageButton from '../PageButton/PageButton'

const NextPage = ({ data }) => {
  const pathname = usePathname()
  const { slug } = useParams()

  return (
    <div className={styles.nextPage}>
      {data?.biography &&
      !pathname.includes('biography') ? (
        <Link href={`/saints/${slug}/biography`}>
          <PageButton
            type="biography"
            bio={true}
          />
        </Link>
      ) : (
        ''
      )}
      {data?.miracles?.length &&
      !pathname.includes('miracles') ? (
        <Link href={`/saints/${slug}/miracles`}>
          <PageButton
            type="miracles"
            bio={true}
          />
        </Link>
      ) : (
        ''
      )}
      {data?.teachings?.length > 0 &&
      !pathname.includes('teachings') ? (
        <Link href={`/saints/${slug}/teachings`}>
          <PageButton
            type="teachings"
            bio={true}
          />
        </Link>
      ) : (
        ''
      )}
    </div>
  )
}

export default NextPage
