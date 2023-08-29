import ImageGlobal from '../../global/ImageGlobal/ImageGlobal'
import * as S from './styles'

const TopAuthor = ({ images= {}, name = '' }) => (
  <S.TopAuthor>
    <ImageGlobal
      src={`${process.env.NEXT_PUBLIC_DOMAIN}/assets/${images[0]?.directus_files_id.id}?key=search`}
      fill={false}
      width={35}
      height={35}
    />
    <div className="name">{name}</div>
  </S.TopAuthor>
)

export default TopAuthor
