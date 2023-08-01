import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'
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
    gap: 50px;

    &.rightRailNoContent {
      .main {
        width: 100%;
      }

      .rightRail {
        display: none;
      }
    }

    .main {
      width: 70%;
    }

    .rightRail {
      width: 20%;
      border-left: 1px solid #dee2e6;
      padding-left: 30px;
    }
  }
`
