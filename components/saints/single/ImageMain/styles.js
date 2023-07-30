import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const ImageContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  display: flex;
  align-content: flex-end;
  gap: 10px;
  position: relative;

  .image1,
  .image2,
  .image3,
  .image4,
  .image5 {
    overflow: hidden;
    position: relative;
    height: 450px;

    img {
      object-fit: cover;
      object-position: 50% 10%;
      cursor: pointer;
      transition: filter 0.3s ease;

      &:hover {
        filter: brightness(0.6);
      }
    }
  }

  .image2,
  .image3,
  .image4,
  .image5 {
    width: 16.67%;
  }

  .image1 {
    width: 33.33%;

    img {
      border-bottom-left-radius: 10px;
      border-top-left-radius: 10px;
    }
  }

  .image5 img {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }
`
