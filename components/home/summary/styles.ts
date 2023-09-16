import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const SaintSummary = styled.div`
  @keyframes show {
    from {
      translate: 0 50%;
    }
  }

  .saint-summary {
    display: block;
    background: linear-gradient(
      180deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(11, 7, 43, 1) 100%
    );
    height: 100%;
    border: 1px solid lavender;
    border-radius: 20px;
    position: relative;
    box-shadow: -6px 6px 16px #e6e6e6, 6px -6px 16px #ffffff;
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s ease-in-out;

    &:hover {
      .bioContainer .summary {
        color: #e4e4e4;
      }
    }

    .death {
      position: absolute;
      top: -10px;
      right: -8px;
      padding: 8px 12px;
      z-index: 5;
      background: ${colors.violet};
      color: #d8d8d8;
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
        border-top-right-radius: 20px;
        border-top-left-radius: 20px;
      }

      .name {
        background: linear-gradient(
          360deg,
          rgba(0, 0, 0, 0.92) 20%,
          rgba(0, 0, 0, 0.7) 60%,
          rgba(255, 255, 255, 0) 100%
        );
        color: #fff;
        padding: 30px 1rem 0 1rem;
        height: 60px;
        font-weight: 600;
        position: absolute;
        margin-bottom: -1px;
        bottom: 0;
        z-index: 2;
        width: 100%;
        line-height: 1.1;
        box-sizing: border-box;
      }
    }

    .bioContainer {
      position: relative;
      z-index: 1;
      width: 100%;
      padding: 0 1rem;
      border-radius: 20px;

      .summary {
        color: #bcbcbc;
        margin-top: 10px;
        overflow: hidden;
        font-size: 14px;
        transition: all 0.2s ease-in-out;
        margin: 1rem 0;

        ul {
          list-style: none;
          margin: 0;
          padding: 0;

          li,
          p {
            display: inline;
          }
        }
      }
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 0.5rem;

      .tag {
        padding: 2px 12px;
        background-color: #393650ab;
        font-size: 10px;
        letter-spacing: 0.5px;
        border-radius: 4px;
        color: #ccad00;
        min-width: fit-content;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      gap: 5px;
      padding: 0 1rem;
      margin-bottom: 1rem;
      border-radius: 20px;
      width: 100%;
      bottom: 0;
      z-index: 2;

      .count {
        background: none;
        border: none;
        display: flex;
        gap: 8px;
        align-items: center;
        font-size: 13px;

        .number {
          color: #555555;
          font-weight: 600;
          line-height: 1;
        }
      }
    }
  }
`
