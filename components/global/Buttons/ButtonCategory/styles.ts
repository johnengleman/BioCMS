import styled from 'styled-components'

interface ButtonProps {
  bg?: string;
}

export const Button = styled.button<ButtonProps>`
  padding: 5px 25px;
  font-size: 10px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
  color: #54846d;
  letter-spacing: 1px;
  background-color: ${({ bg }) => (bg ? bg : '#66778B')};
`
