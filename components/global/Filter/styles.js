import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Filter = styled.div`
  width: 100%;
  margin-top: 10px;
  margin-bottom: 20px;

  @media ${device.tablet} {
    margin-top: 20px;
    margin-bottom: 30px;
  }

  .embla__container {
    gap: 20px;
  }

  .embla__slide {
    font-size: 12px;
    color: rgb(113, 113, 113);
    cursor: pointer;
    flex: unset;
    min-width: fit-content;
    border-bottom: 2px solid transparent;
    transition: border;
    padding: 7px 20px;
    border-radius: 10px;
    border: 2px solid #dddddd;

    &:hover,
    &.selected {
      border: 2px solid #4e4e4e;
    }
  }

  .embla__viewport {
    padding: 0 10px;

    @media ${device.tablet} {
      padding: 0 25px;
    }

    &::after {
      content: '';
      z-index: 1;
      position: absolute;
      height: 100%;
      width: 20px;
      left: 0;
      top: 0;
      background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );

      @media ${device.tablet} {
        width: 40px;
      }
    }

    &::before {
      content: '';
      z-index: 1;
      position: absolute;
      height: 100%;
      width: 20px;
      right: 0;
      top: 0;
      background: linear-gradient(
        270deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(0, 0, 0, 0) 100%
      );

      @media ${device.tablet} {
        width: 40px;
      }
    }
  }
`
