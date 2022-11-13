import styled from 'styled-components'

export const Button = styled.button`
  background-color: #d9d9d9;
  color: black;
  border: 2px solid white;
  font-size: 11px;
  font-weight: 600;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  gap: 7px;
  width: max-content;
  cursor: pointer;
`

export const Hamburger = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  width: 12px;

  div {
    background-color: grey;
    height: 2px;
    width: 100%;
  }
`
