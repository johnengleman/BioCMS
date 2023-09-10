import * as S from './styles'
import Link from 'next/link'
import { load } from 'cheerio'
import count from 'word-count'

function extractH3s(htmlString) {
  const $ = load(htmlString)
  const h3s = []

  $('h3').each((index, element) => {
    h3s.push($(element).text())
  })

  return h3s
}

const BentoSection = ({ title, data, link }) => {
  if (!data) {
    return
  }

  const wordCount = count(data)
  const h3s = extractH3s(data)

  return (
    <S.BentoSection>
      <div className="header">
        <h3>{title}</h3>
        <span className="word-count">
          {wordCount} words
        </span>
      </div>
      <div className="toc">
        {h3s.map((h3, i) => (
          <span
            key={i}
            className="h3"
          >
            {i + 1}. {h3}
          </span>
        ))}
      </div>

      <div className="footer">
        <Link href={link || ''}>
          <button>Read</button>
        </Link>
      </div>
    </S.BentoSection>
  )
}

export default BentoSection
