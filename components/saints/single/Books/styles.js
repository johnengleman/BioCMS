import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const Book = styled.a`
  display: flex;
  gap: 20px;
  width: 100%;
  color: inherit;

  @media ${device.tablet} {
    width: calc(50% - 20px);
  }

  @media ${device.laptopL} {
    width: calc(33% - 20px);
  }

  img {
    border-radius: 5px;
  }

  .book-info {
    width: 300px;
  }

  .book-name {
    font-size: 16px;
    font-weight: 700;
    line-height: 1.2;
    width: 100%;
  }

  .book-author {
    font-size: 14px;
    color: #4e4d4d;
    margin-bottom: 15px;
  }

  .book-description {
    font-size: 14px;
    line-height: 1.2;
    margin-bottom: 15px;
    color: #2b2b2b;
  }

  .book-link {
    font-size: 14px;
    text-decoration: underline;
  }
`
