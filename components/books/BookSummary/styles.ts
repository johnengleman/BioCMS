import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const BookSummary = styled.div`
  width: 100%;
  border: 1px solid transparent;

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 30px auto;

    @media ${device.tablet} {
      margin: 0 0 0 30px;
      width: 100%;
    }

    &.col-1 {
      @media ${device.tablet} {
        margin-right: 50px;
        position: relative;
        top: -70px;
      }
    }
  }

  .image {
    margin-bottom: 30px;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: -5px 2px 10px 3px rgba(0, 0, 0, 0.2);
  }

  .book-link {
    background-color: #333;
    color: #fff;
    font-weight: 500;
    border: none;
    border-radius: 20px;
    padding: 8px 20px;
    width: 250px;
    box-shadow: -5px 2px 10px 3px rgba(0, 0, 0, 0.2);
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    border-radius: 5px;
    background-color: #fff;
    padding: 20px;
    border: 1px solid #e2e2e2;
    display: flex;
    flex-direction: column;
    position: relative;

    @media ${device.tablet} {
      margin-top: 50px;
      flex-direction: row;
      padding: 40px 50px 20px 20px;
    }

    .title {
      font-size: 1.1rem;
      line-height: 1.2;
      color: #555;
      font-weight: 500;
      margin-top: 0px;
      margin-bottom: 5px;
      text-align: center;

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

      @media ${device.tablet} {
        text-align: left;
      }
    }

    .description {
      font-size: 0.9rem;
      color: #999;
      margin-top: 0.5rem;
    }

    .dots {
      display: flex;
      flex-direction: column;
      gap: 3px;
      position: absolute;
      right: 15px;
      top: 15px;

      .dot {
        height: 5px;
        width: 5px;
        border-radius: 50%;

        &:nth-child(1) {
          background-color: #666666;
        }
        &:nth-child(2) {
          background-color: #a3a3a3;
        }
        &:nth-child(3) {
          background-color: #d5d5d5;
        }
      }
    }
  }
`
