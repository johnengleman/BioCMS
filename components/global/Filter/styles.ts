import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors, variables } from '../../../styles/colors'

export const Filter = styled.div`
  width: 100vw;
  min-width: 100vw;
  height: min-content;
  border: 1px solid #dfdfdf;
  padding: 50px 0;
  position: relative;
  margin-top: -30px;
  margin-bottom: 30px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.7)
      ),
      url('/footer.webp');
    background-size: cover; /* This will cover the entire viewport */
    background-repeat: no-repeat; /* Important if the image is smaller than the footer */
    background-position: center 45%; /* This will center the image */
    transform: scaleX(-1);
    z-index: 0;
  }

  .content-container {
    max-width: 1350px;
    margin: 0 auto;
    width: 95%;
    position: relative;
    z-index: 2;
  }

  .instruction {
    color: #dadada;
    font-size: 12px;
    text-align: left;
  }

  .bento-container {
    display: flex;
    gap: 0.5rem;
    margin: 0.5rem 0 2.5rem 0;
    justify-content: flex-start;

    .bento {
      border: 1px solid #e7e7e7;
      display: flex;
      gap: 20px;
      justify-content: space-between;
      padding: 15px 25px;
      align-items: center;
      border-radius: 10px;
      cursor: pointer;
      gap: 30px;
      border: 1px solid transparent;
      transition: all 0.1s ease-in-out;
      background: linear-gradient(
        90deg,
        rgba(36, 30, 78, 1) 0%,
        rgba(49, 45, 76, 1) 100%
      );

      &:hover {
        border: 1px solid #dadada;
        h3 {
          color: #ffecec;
        }
      }

      &.active {
        border: 1px solid #ffffff;

        h3 {
          color: #ffecec;
        }
      }

      h3 {
        font-weight: 400;
        font-size: 16px;
        color: rgb(233, 230, 253);
        line-height: 1.1;
      }
    }
  }

  .filter-container {
    display: flex;
    justify-content: flex-start;
  }

  .slide-container {
    padding: 10px 0;
    display: flex;
    flex-wrap: wrap;
    width: 50%;
    gap: 0.5rem;
    justify-content: flex-start;
  }

  .slide {
    font-size: 12px;
    color: rgb(113, 113, 113);
    cursor: pointer;
    flex: unset;
    min-width: fit-content;
    border-bottom: 2px solid transparent;
    transition: border;
    background-color: #fff;
    padding: 4px 15px;
    border-radius: 10px;
    border: 2px solid #dddddd;
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
      /* background: linear-gradient(
        90deg,
        #fff 0%,
        rgba(0, 0, 0, 0) 100%
      ); */
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
      /* background: linear-gradient(
        270deg,
        #fff 0%,
        rgba(0, 0, 0, 0) 100%
      ); */
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
