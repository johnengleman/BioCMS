import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'
import { device } from '../../styles/devices'

export const Saint = styled.div`
  width: 100%;

  .col {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background-size: cover;
    align-items: flex-start;
    height: auto;

    @media ${device.laptop} {
      margin: 20px 0;
      flex-direction: row;
      height: 425px;
      align-items: flex-end;
      background-image: url(${headerBg.src});
    }
  }

  .quotes {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }

  .summary {
    font-weight: 500;
    font-size: 16px;
    line-height: 1.3;
    color: #000;
    margin-bottom: 20px;

    @media ${device.laptop} {
      color: #525252;
      margin: 40px 0 20px 0;
      max-width: 80%;
    }
  }
`
