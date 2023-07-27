import Image from 'next/image'
import { Title, Flex } from '@mantine/core'
import * as S from './styles'

type ChurchProps = {
  title: string
  author: {
    name: string
  }
  link: string
  pages?: string
  book_cover: {
    id: string
  }
}

const Church = ({
  title,
  author,
  link,
  pages,
  book_cover,
}: ChurchProps) => {
  return (
    <S.Church>
      <a
        href={link}
        className="church-image"
      >
        {book_cover?.id ? (
          <Image
            src={`https://saints-cms.onrender.com/assets/${book_cover?.id}`}
            height="150"
            width="140"
            alt=""
            unoptimized={true}
          />
        ) : (
          <div
            className="placeholder"
            style={{
              height: '140px',
              width: '100px',
              background: 'lightgray',
            }}
          ></div>
        )}
      </a>
      <a
        href={link}
        className="church-info"
      >
        <div className="church-name">{title}</div>
        <div className="church-location">{author.name}</div>
      </a>
    </S.Church>
  )
}

type ChurchesProps = {
  churches: ChurchProps[]
}

const Churches = ({ churches }: ChurchesProps) => (
  <>
    <Title
      order={3}
      mb={10}
    >
      Churches
    </Title>

    <Flex
      gap="md"
      wrap="wrap"
      justify="space-between"
      mb="50px"
    >
      {churches?.map((book, i) => (
        <Church
          key={i}
          title={book?.title}
          link={book?.link}
          book_cover={book?.book_cover}
        />
      ))}
    </Flex>
  </>
)

export default Churches
