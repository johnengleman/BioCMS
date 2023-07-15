import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const ImageContainer = styled.div`
  margin-bottom: 20px;

  @media ${device.laptop} {
    margin: 0 20px 20px 20px;
    min-width: 350px;
  }

  .image {
    border-radius: 10px;
    margin: 0 auto;
    overflow: hidden;
    box-shadow: 4px 0 4px 0 rgba(0, 0, 0, 0.25);
    width: 90%;

    img {
      width: 100%;
      height: auto;
    }
  }
`
