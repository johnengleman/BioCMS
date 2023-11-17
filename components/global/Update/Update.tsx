import styles from './styles.module.scss'

const Update = ({ date, title, description }) => {
  const newDate = new Date(date)

  const formattedDate = `${newDate.toLocaleString(
    'default',
    {
      month: 'long',
    },
  )} ${newDate.getDate()}, ${newDate.getFullYear()}`

  return (
    <div className={styles.update}>
      <div className={styles.date}>{formattedDate}</div>
      <div className={styles.content}>
        <div className={styles.header}>{title}</div>
        <div
          className={styles.description}
          dangerouslySetInnerHTML={{
            __html: description,
          }}
        ></div>
      </div>
    </div>
  )
}

export default Update
