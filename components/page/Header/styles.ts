import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors } from '../../../styles/colors'

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 20px -3px rgba(0, 0, 0, 0.1);

  .content {
    width: 75%;
    max-width: 1350px;
    margin: 0 auto;
    display: flex;
  }

  .row {
    display: flex;
    align-items: center;

    &.row-1 {
      height: 60px;
    }

    .col {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .center {
      justify-content: center;
    }

    .left {
      justify-content: flex-start;
    }

    .right {
      justify-content: flex-end;
    }
  }
`

export const Navigation = styled.div`
  display: flex;
  gap: 10px;

  a {
    color: #333;
    font-size: 14px;
    padding: 4px 10px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      color: #999;
    }
  }
`
