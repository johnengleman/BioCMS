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
  return (
    <S.Bio>
      <h2>Life</h2>
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
