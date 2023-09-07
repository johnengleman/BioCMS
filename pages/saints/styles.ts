import styled from 'styled-components'
import { device } from '../../styles/devices'

export const Saint = styled.div`
  width: 100%;
  color: #212121;
  display: flex;
  gap: 60px;

  .leftRail {
    width: 150px;
    padding-top: 80px;
    display: none;

    @media ${device.laptop} {
      display: block;
    }
  }

  .main {
    width: 100%;

    @media ${device.tablet} {
      width: calc(100% - 300px);
    }

    @media ${device.laptop} {
      width: calc(100% - 500px);
    }
  }

  .rightRail {
    width: 300px;
    padding-top: 200px;
    display: none;

    @media ${device.tablet} {
      display: block;
    }

    @media ${device.laptop} {
      width: 350px;
    }
  }
`

export const FilterCustomizeRow = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`
