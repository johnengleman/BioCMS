import { useState } from 'react'
import ReadMore from '../ReadMore/ReadMore'
import styles from './styles.module.scss'

const TextSection = ({ title, text }) => {
  const [readMore, setReadMore] = useState(false)

  if (!text) {
    return null
  }

  return (
    <div className={styles.textSection}>
      <h2 className="title">{title}</h2>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: text,
        }}
      ></div>
      <div className="footer">
        <ReadMore
          onClick={() => setReadMore(!readMore)}
          readMore={readMore}
        />
      </div>
    </div>
  )
}

export default TextSection
