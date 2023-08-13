import styled from 'styled-components'
import { colors } from '../../../styles/colors'
import { device } from '../../../styles/devices'

export const QuoteSummary = styled.div`
  width: 100%;
  background-color: ${colors.gold};
  padding: 30px 20px 40px 20px;
  border-radius: 5px;
  position: relative;

  @media ${device.mobileL} {
    width: calc(50% - 1rem);
  }

  @media ${device.tablet} {
    width: calc(33% - 1rem);
  }

  @media ${device.laptop} {
    width: calc(25% - 1rem);
  }

  @media ${device.laptopL} {
    width: calc(20% - 1rem);
  }

  .topic {
    background-color: ${colors.violet};
    position: absolute;
    top: -10px;
    left: -10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${colors.mint};
    font-weight: 700;
    padding: 2px 20px;
    border-radius: 3px;
    transform: rotate(-10deg);
    font-size: 12px;
  }

  .text {
    font-weight: 600;
    color: ${colors.violet};
    margin-bottom: 30px;
    font-size: 1rem;

    &::first-letter {
      color: ${colors.brown};
      font-size: 1.5rem;
    }
  }

  .source {
    line-height: 1;
    font-size: 14px;
    font-style: italic;
    color: ${colors.mint};
    position: absolute;
    bottom: 20px;
    left: 20px;
    width: 90%;

    @media ${device.tablet} {
      right: 30px;
      width: 75%;
    }

    @media ${device.laptopL} {
      width: fit-content;
      right: 0;
    }
  }
`
