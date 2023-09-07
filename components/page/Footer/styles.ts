import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Footer = styled.div`
  background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.4),
      rgba(0, 0, 0, 0.4)
    ),
    url('/footer.webp');
  background-size: cover; /* This will cover the entire viewport */
  background-repeat: no-repeat; /* Important if the image is smaller than the footer */
  background-position: center 58%; /* This will center the image */
  height: 100px; /* Or whatever height you want */
  color: #fff;
  width: 100%;
  position: relative;
  border-top: 2px solid #522900;

  @media ${device.tablet} {
    height: 200px;
  }

  .links {
    width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: space-between;
    padding: 20px 40px;
    border-radius: 20px;
    flex-direction: column;

    @media ${device.tablet} {
      flex-direction: row;
      width: 90%;
      left: 40px;
      bottom: 40px;
    }

    @media ${device.laptopL} {
      bottom: 20px;
    }

    .title {
      font-size: 25px;
      font-weight: 700;
      line-height: 1;
      margin-bottom: 10px;

      @media ${device.tablet} {
        margin-bottom: 0;
      }

      @media ${device.laptopL} {
        font-size: 30px;
      }
    }

    a {
      color: #fff;
      font-size: 16px;
      font-weight: 700;
      margin: 2px 15px;
      border-bottom: 3px solid transparent;
      transition: border 0.1s ease-in-out;
      letter-spacing: 1px;

      @media ${device.laptopL} {
        font-size: 18px;
      }

      &:first-child {
        margin-left: 0;
      }

      &:hover {
        border-bottom: 3px solid white;
      }
    }

    .row {
      display: flex;
      gap: 20px;
      align-items: flex-end;
    }

    .slogan {
      font-size: 15px;
      font-weight: 500;

      @media ${device.laptopL} {
        font-size: 18px;
      }
    }
  }
`
