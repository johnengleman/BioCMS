import styled from 'styled-components'

export const Button = styled.button`
  background-color: #d9d9d9;
  color: black;
  border: 1px solid #dee2e6;
  line-height: 1;
  font-weight: 600;
  font-size: 12px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  padding: 8px 10px;
  gap: 10px;
  width: max-content;
  cursor: pointer;
  position: absolute;
  bottom: 20px;
  left: 25px;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }
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
