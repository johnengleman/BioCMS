import React from 'react'
import * as S from './styles'

type Props = {
  text: string
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const ButtonAction = ({ text, onClick }: Props) => (
  <S.Button onClick={onClick}>
    <S.Hamburger>
      <div />
      <div />
      <div />
    </S.Hamburger>
    {text}
  </S.Button>
)

export default ButtonAction
