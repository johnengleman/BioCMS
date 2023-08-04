import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const QuoteSummary = styled.div`
  width: 25%;
  min-width: 300px;
  background-color: ${colors.gold};
  padding: 30px 20px 40px 20px;
  border-radius: 5px;
  position: relative;

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
      font-size: 2rem;
      color: ${colors.brown};
    }
  }

  .source {
    line-height: 1;
    font-size: 14px;
    font-style: italic;
    color: ${colors.mint};
    position: absolute;
    bottom: 20px;
    right: 30px;
  }
`
