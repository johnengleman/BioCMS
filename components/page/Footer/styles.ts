import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Footer = styled.div`
  background-color: #343434;
  height: 60px; /* Or whatever height you want */
  color: #fff;
  width: 100%;
  display: flex;
  margin-top: 150px;

  .content {
    width: 90%;
    width: 1450px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    .left {
      justify-content: flex-start;
    }

    .center {
      justify-content: center;
    }

    .right {
      justify-content: flex-end;
    }

    .row {
      display: flex;
      flex: 1;
    }

    a {
      color: #fff;
      text-decoration: none;
      margin: 0 20px;
      font-size: 14px;
      transition: all 0.1s ease-in-out;

      &:hover {
        color: #999;
      }
    }
  }
`
