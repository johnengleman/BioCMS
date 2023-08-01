import styled from 'styled-components'

export const Church = styled.a`
  display: flex;
  flex-direction: column;
  color: inherit;

  img,
  .image-placeholder {
    border-radius: 5px;
  }

  .image-placeholder {
    width: 300px;
    height: 175px;
    background-color: #d9d9d9;
  }

  .name {
    font-size: 16px;
    font-weight: 700;
    margin-top: 5px;
  }

  .location {
    font-size: 14px;
  }
`
