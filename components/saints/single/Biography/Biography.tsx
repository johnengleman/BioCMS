import * as S from './styles'

type Props = {
  text: string
  birthDate: number
  birthLocation: string
  deathDate: number
  deathLocation: string
  summary: string
}

const Biography = (props) => {
  console.log(props.biography)
  return (
    <S.Bio>
      <div
        className="text"
        dangerouslySetInnerHTML={{
          __html: props.biography,
        }}
      />
    </S.Bio>
  )
}

export default Biography
