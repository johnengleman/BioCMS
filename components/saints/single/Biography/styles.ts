import styled from 'styled-components'
import { device } from '../../../../styles/devices'
import { colors } from '../../../../styles/colors'

export const Bio = styled.div<{ $readMore?: Boolean }>`
  color: #0e0e0e;
  margin-bottom: 60px;
  border-radius: 10px;
  position: relative;
  transition: height 0.2s ease-in-out;
  height: auto;

  .summary {
    font-weight: 500;
    font-size: 14px;
    font-style: italic;
    line-height: 1.4;
    color: #000;
    margin-bottom: 20px;
    color: #525252;
    padding-bottom: 20px;
    border-bottom: 1px solid lightblue;
  }

  h2 {
    position: absolute;
    top: -15px;
    left: -10px;
    background: ${colors.violet};
    color: ${colors.gold};
    padding: 5px 20px;
    font-size: 0.8rem;
    font-weight: 500;
    border-radius: 3px;
    transform: rotate(-4deg);
  }

  .text {
    height: calc(100% - 100px);
    overflow: hidden;

    h3 {
      color: #222;
      font-weight: 500;
      font-size: 1.2rem;
      border-top: 1px solid #ddd;
      padding-top: 1rem;
      margin-top: 2rem;
      padding-left: 1rem;
      padding-bottom: 0.5rem;
      border-left: 1px solid #ddd;

      &:first-child {
        margin-top: 0;
      }
    }

    .ac-horizontal-separator {
      margin-top: 2rem;
    }

    p {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: #222;
      font-family: sans-serif;
      padding-bottom: 1rem;
      border-left: 1px solid #ddd;
      padding-left: 1rem;

      &:has(+ h3),
      &:last-child {
        padding-bottom: 0;
      }
    }
  }
`
