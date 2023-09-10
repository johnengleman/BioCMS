import styled from 'styled-components'
import { device } from '../../styles/devices'

export const Saint = styled.div`
  width: 100%;
  color: #212121;
  display: flex;
  gap: 40px;

  .leftRail {
    width: 250px;
    min-width: 250px;
    display: none;

    @media ${device.laptop} {
      display: block;
    }
  }

  .main {
    width: 100%;

    @media ${device.tablet} {
      width: calc(100% - 250px);
    }

    @media ${device.laptop} {
      width: calc(100% - 250px);
    }

    border-left: 1px solid #dddddd;
    padding-left: 2.5rem;

    .bento-section {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }

    .text {
      h3 {
        margin: 30px 0 10px 0;
      }

      p {
        font-size: 15px;
        line-height: 1.5;
        margin-bottom: 0.5rem;
      }

      img {
        float: left;
        margin-right: 30px;
      }
    }
  }

  .rightRail {
    width: 300px;
    min-width: 300px;
    display: none;
    padding-top: 250px;

    @media ${device.tablet} {
      display: block;
    }
  }
`

export const FilterCustomizeRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
