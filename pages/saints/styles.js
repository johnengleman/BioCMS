import styled from 'styled-components'
import { device } from '../../styles/devices'

export const Saint = styled.div`
  width: 100%;
  font-family: var(--font-inter);
  color: #212121;

  .col {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .quotes {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }

  .body {
    display: flex;
    flex-direction: column;

    @media ${device.tablet} {
      flex-direction: row;
      gap: 30px;
    }

    @media ${device.laptop} {
      gap: 40px;
    }

    @media ${device.laptopL} {
      gap: 50px;
    }

    .main {
      width: 100%;

      @media ${device.tablet} {
        width: 60%;
      }
    }

    .rightRail {
      width: 100%;

      @media ${device.tablet} {
        width: 40%;
        padding-left: 30px;
        border-left: 1px solid #dee2e6;
      }

      @media ${device.laptop} {
        padding-left: 40px;
      }

      @media ${device.laptopL} {
        padding-left: 50px;
      }
    }
  }
`
