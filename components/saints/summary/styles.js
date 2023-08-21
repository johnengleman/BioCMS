import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const SaintSummary = styled.div`
  .saint-summary {
    display: block;
    width: 100%;
    height: 100%;
    border: 1px solid lavender;
    border-radius: 20px;
    position: relative;
    background-color: ${colors.mint};
    background: #ffffff;
    box-shadow: -6px 6px 16px #e6e6e6, 6px -6px 16px #ffffff;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.1s ease-in-out;

    &:hover {
      filter: brightness(0.95);
    }

    .death {
      position: absolute;
      top: -10px;
      right: -8px;
      padding: 8px 12px;
      z-index: 5;
      background: ${colors.violet};
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      font-size: 12px;
      box-shadow: -2px 4px 10px 0px #121023;
      gap: 3px;

      svg {
        margin-bottom: 2px;
      }
    }

    .image {
      width: 100%;
      position: relative;
      height: 375px;
      z-index: 2;

      img {
        transition: transform 0.5s ease;
        object-fit: cover;
        object-position: 50% 10%;
        border-radius: 20px;
      }
    }

    .name {
      background-color: ${colors.brown};
      color: #ccebd9;
      text-align: center;
      font-size: 16px;
      padding: 6px 15px;
      border-radius: 10px;
      font-weight: 500;
      position: absolute;
      top: 360px;
      left: 5%;
      z-index: 2;
      width: 90%;
      line-height: 1.1;
      box-sizing: border-box;
    }

    .bioContainer {
      position: relative;
      z-index: 1;
      width: 90%;
      padding: 1.5rem 1rem 0.5rem 1rem;
      border-radius: 10px;

      .summary {
        color: #1a4760;
        margin-top: 10px;
        margin-bottom: 0.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 10;
        -webkit-box-orient: vertical;
        overflow: hidden;
        font-size: 14px;
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      padding: 0 1rem;
      margin-bottom: 1rem;

      .tag {
        padding: 2px 12px;
        background-color: #ccebd9;
        font-size: 10px;
        font-weight: 500;
        border-radius: 5px;
        color: #54846d;
        font-weight: 600;
        min-width: fit-content;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      padding: 0 1rem;
      margin-bottom: 1rem;

      .footer-button {
        background: none;
        border: none;
        display: flex;
        align-items: center;
      }

      .dates {
        font-size: 10px;
        color: #676666c2;
        text-align: right;
      }
    }
  }
`

export const Count = styled.span`
  color: #676666c2;
  font-size: 15px;
  font-weight: 600;
  margin-left: 10px;
`
