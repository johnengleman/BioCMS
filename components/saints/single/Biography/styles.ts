import styled from 'styled-components'
import { device } from '../../../../styles/devices'
import { colors } from '../../../../styles/colors'

export const Bio = styled.div<{ $readMore?: Boolean }>`
  color: #0e0e0e;
  padding: 20px;
  margin-bottom: 60px;
  border-radius: 10px;
  background: #fff;
  box-shadow: 7px -7px 20px 1px #00d1d157,
    -7px 7px 14px #fff;
  border: 1px solid #dee2e6;
  position: relative;
  transition: height 0.2s ease-in-out;
  height: ${(props) =>
    props?.$readMore ? 'auto' : '600px'};

  @media ${device.laptop} {
    padding: 40px 40px 60px 40px;
  }

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
      color: #666;
      font-weight: 500;
      font-size: 1.2rem;
      border-bottom: 1px solid #ddd;
      padding-bottom: 0.25rem;
      margin-bottom: 0.5rem;
      margin-top: 2rem;

      &:first-child {
        margin-top: 0;
      }
    }

    p {
      font-size: 0.9375rem;
      line-height: 1.6;
      color: #202122;
      font-family: sans-serif;
      margin-bottom: 1rem;
    }
  }

  .footer {
    position: relative;
    margin-top: 30px;

    &::after {
      content: '';
      position: absolute;
      bottom: 30px;
      left: 0;
      right: 0;
      width: 100%;
      height: 50px;
      z-index: 1;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.4),
        rgba(255, 255, 255, 1)
      );
    }
  }
`
