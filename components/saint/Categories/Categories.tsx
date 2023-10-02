import ButtonCategory from '../../global/Buttons/ButtonCategory/ButtonCategory'
import styles from './styes.module.scss'

type Props = {
  data?: []
}

const Categories = ({ data }: Props) => (
  <div className={styles.powers}>
    {data?.map((category, i) => (
      <ButtonCategory
        text={category}
        bg="#E4EDFB"
        key={i}
      />
    ))}
  </div>
)

export default Categories
