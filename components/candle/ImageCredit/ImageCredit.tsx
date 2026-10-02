import styles from './styles.module.scss'

type Metadata = {
  attribution?: string
  license?: string
  license_url?: string
  source_url?: string
}

export type CreditedImage = {
  metadata?: Metadata | null
}

// A small credit line for an image: who made it, the license, and where
// it came from. Renders nothing when the file has no credit metadata.
// Place it inside the <figure> that holds the image.
const ImageCredit = ({
  image,
}: {
  image?: CreditedImage | null
}) => {
  const m = image?.metadata
  if (!m || (!m.attribution && !m.license)) return null

  return (
    <figcaption className={styles.credit}>
      <span>Image: </span>
      {m.attribution && <span>{m.attribution}</span>}
      {m.license && (
        <>
          {m.attribution && <span> · </span>}
          {m.license_url ? (
            <a
              href={m.license_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {m.license}
            </a>
          ) : (
            <span>{m.license}</span>
          )}
        </>
      )}
      {m.source_url && (
        <>
          <span> · </span>
          <a
            href={m.source_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Source
          </a>
        </>
      )}
    </figcaption>
  )
}

export default ImageCredit
