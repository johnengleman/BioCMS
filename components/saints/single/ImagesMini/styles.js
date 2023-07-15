import styled from 'styled-components'

export const PicturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Pictures = styled.div`
  display: flex;
  align-content: flex-end;
  gap: 10px;
  align-items: flex-end;
  margin-bottom: 70px;

  .image-container {
    position: relative;
    height: 140px;

    img {
      border-radius: 5px;
    }
  }
`
