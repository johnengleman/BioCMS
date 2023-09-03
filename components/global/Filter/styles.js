import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors, variables } from '../../../styles/colors'

export const Filter = styled.div`
  width: 100%;
  background-color: ${variables.filterBackground};
  padding: 20px 0px 5px 0px;
  border-radius: 8px;
  margin-bottom: 20px;
  margin-top: 10px;

  @media ${device.tablet} {
    padding: 20px 30px 10px 30px;
  }

  .embla__container {
    padding: 20px 0;
  }

  .embla__slide {
    font-size: 12px;
    color: rgb(113, 113, 113);
    cursor: pointer;
    flex: unset;
    min-width: fit-content;
    border-bottom: 2px solid transparent;
    transition: border;
    background-color: #fff;
    padding: 7px 20px;
    border-radius: 10px;
    border: 2px solid #dddddd;
    margin-right: 20px;
    opacity: 0;
    transition: opacity 0.5s ease-in-out,
      border-color 0.1s ease-in-out;

    &.visible {
      opacity: 1;
    }

    &:hover,
    &.selected {
      border: 2px solid ${colors.gold};
    }
  }

  .embla__viewport {
    padding-right: 0 10px;
    transition: margin 0.1s ease-in-out;
    justify-content: flex-start;
    display: flex;

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
        ${variables.filterBackground} 0%,
        rgba(0, 0, 0, 0) 100%
      );
      display: none;

      @media ${device.tablet} {
        display: block;
        width: 50px;
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
        ${variables.filterBackground} 0%,
        rgba(0, 0, 0, 0) 100%
      );
      display: none;

      @media ${device.tablet} {
        display: block;
        width: 50px;
      }
    }
  }

  .placeholder {
    width: 100%;
    visibility: hidden;
  }

  .sticky {
    will-change: scroll-position;
    position: fixed;
    top: 0;
    left: 0;
    background-color: white;
    width: 100%; /* Ensure it spans the full width when sticky */
    z-index: 1000; /* This is to ensure it stays above other content. Adjust as necessary. */
    box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid lightgray;

    .embla {
      width: 90%;
      margin: 0 auto;
      max-width: 1350px;

      .embla__viewport {
        &::after {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }
        &::before {
          background: linear-gradient(
            270deg,
            rgba(255, 255, 255, 1) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }
      }
    }
  }
`
