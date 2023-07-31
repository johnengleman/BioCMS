import styled from 'styled-components'

export const ImageContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-content: flex-end;
  gap: 10px;

  .image1,
  .image2,
  .image3,
  .image4,
  .image5 {
    overflow: hidden;
    position: relative;

    img {
      object-fit: cover;
      object-position: 50% 10%;
    }
  }

  .image2,
  .image3,
  .image4,
  .image5 {
    width: 16.67%;
    height: 300px;
    align-self: flex-end;
  }

  .image1 {
    width: 33.33%;
    height: 450px;
    position: relative;

    img {
      border-radius: 10px;
    }
  }

  .image2 img {
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  .image:last-child img {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
