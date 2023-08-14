import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const ImageContainer = styled.div`
  width: 100%;
  display: flex;
  align-content: flex-end;
  margin-bottom: 20px;
  border-bottom: 1px solid #dee2e6;
  padding-bottom: 20px;

  @media ${device.tablet} {
    gap: 10px;
    margin-bottom: 25px;
  }

  @media ${device.laptop} {
    margin-bottom: 25px;
  }

  @media ${device.laptopL} {
    padding-bottom: 30px;
    margin-bottom: 30px;
  }

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
      border: 1px solid #dee2e6;
    }
  }

  .image1 {
    width: 100%;
    height: 450px;
    position: relative;

    @media ${device.tablet} {
      width: 50%;
    }

    @media ${device.laptop} {
      width: 33%;
    }

    img {
      border-radius: 10px;

      @media ${device.tablet} {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
    }
  }

  .image:last-child img {
    border-top-right-radius: 10px;
    border-bottom-right-radius: 10px;
  }

  @media ${device.tablet} {
    .image2,
    .image3 {
      width: 25%;
      display: block;
    }

    .image2 {
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
    }

    .image3 {
      border-top-right-radius: 10px;
      border-bottom-right-radius: 10px;
    }
  }

  @media ${device.laptop} {
    .image3 {
      border-top-right-radius: 0;
      border-bottom-right-radius: 0;
    }

    .image2,
    .image3,
    .image4,
    .image5 {
      width: 16.67%;
      height: 450px;
      align-self: flex-end;
      display: block;
    }
  }
`
