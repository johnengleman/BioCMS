import styled from 'styled-components'
import { colors, variables } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const Slide = styled.div`
  width: 750px;
  min-width: 750px;
  position: relative;

  &:nth-child(3n + 1) .content {
    background-color: ${variables.slideBackground1};

    .description::after {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${variables.slideBackground1}
      );
    }
  }

  &:nth-child(3n + 2) .content {
    background-color: ${variables.slideBackground2};

    .description::after {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${variables.slideBackground2}
      );
    }
  }

  &:nth-child(3n + 3) .content {
    background-color: ${variables.slideBackground3};

    .description::after {
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        ${variables.slideBackground3}
      );
    }
  }

  @media ${device.tablet} {
    margin-bottom: 50px;
  }

  .image {
    box-shadow: -5px 2px 10px 3px rgba(0, 0, 0, 0.2);
    z-index: 1;
    width: min-content;
    margin: 0 auto;

    @media ${device.tablet} {
      position: absolute;
      top: 35px;
      left: 40px;
    }

    img {
      max-width: 100px;

      @media ${device.tablet} {
        max-width: 200px;
      }
    }
  }

  .book-link {
    background-color: #fff;
    color: #333;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    padding: 8px 20px;
    width: 200px;
    font-size: 0.85rem;
    box-shadow: -5px 2px 10px 3px rgba(0, 0, 0, 0.2);
  }

  .content {
    width: 100%;
    display: flex;
    gap: 20px;
    justify-content: flex-end;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e2e2e2;
    display: flex;
    flex-direction: column;
    position: relative;

    @media ${device.tablet} {
      flex-direction: row;
      padding: 30px;
      gap: 40px;
      height: 300px;
    }

    .info {
      @media ${device.tablet} {
        width: 65%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }

    .title {
      font-size: 1.1rem;
      line-height: 1.2;
      color: #555;
      font-weight: 700;
      margin-top: 0px;
      margin-bottom: 5px;
      text-align: center;
      color: #fff;

      @media ${device.tablet} {
        text-align: left;
      }
    }

    .author {
      font-size: 0.9rem;
      color: #555;
      font-weight: 400;
      margin-bottom: 10px;
      text-align: center;
      color: #fff;

      @media ${device.tablet} {
        text-align: left;
      }
    }

    .description {
      margin-top: 0.5rem;
      margin-bottom: 1rem;
      position: relative;
      overflow: hidden;

      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 50px;
      }

      p {
        font-size: 0.9rem;
        color: #fff;
        overflow: hidden;
      }
    }
  }
`
