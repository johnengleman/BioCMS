import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors } from '../../../styles/colors'

export const Mini = styled.div`
  width: 10%;
  height: 225px;
  min-width: 150px;
  display: block;
  margin-right: 15px;

  .saint-mini {
    position: relative;
    display: block;
    height: 85%;
    margin-top: 7%;
  }

  .image {
    width: 100%;
    position: relative;
    height: 100%;
    z-index: 2;

    img {
      transition: transform 0.5s ease;
      object-fit: cover;
      object-position: 50% 10%;
      border-radius: 10px;
    }
  }

  .name {
    background-color: ${colors.brown};
    color: #ccebd9;
    text-align: center;
    font-size: 11px;
    padding: 6px 15px;
    border-radius: 5px;
    font-weight: 500;
    position: absolute;
    bottom: -20px;
    left: 5%;
    z-index: 2;
    width: 90%;
    line-height: 1.1;
    box-sizing: border-box;
  }

  .death {
    position: absolute;
    top: -10px;
    right: -8px;
    padding: 6px 10px;
    z-index: 5;
    background: ${colors.violet};
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 15px;
    font-size: 10px;
    box-shadow: -2px 4px 10px 0px #121023;
    gap: 3px;

    svg {
      margin-bottom: 2px;
    }
  }
`
