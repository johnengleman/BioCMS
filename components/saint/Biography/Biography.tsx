import styles from './styles.module.scss'

type Props = {
  text: string
  birthDate: number
  birthLocation: string
  deathDate: number
  deathLocation: string
  summary: string
}

const Biography = (props) => {
  return (
    <div className={styles.bio}>
      <h2>Life</h2>
      <div
        className={styles.text}
        dangerouslySetInnerHTML={{
          __html: props.biography,
        }}
      />
    </div>
  )
}

export default Biography
