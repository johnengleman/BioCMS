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
    margin-top: 5px;
  }

  .book-name {
    font-size: 14px;
    font-weight: 700;
    line-height: 1.2;
    width: 100%;

    @media ${device.laptop} {
      font-size: 1rem;
    }
  }

  .book-author {
    font-size: 12px;
    color: #4e4d4d;
    margin-bottom: 10px;

    @media ${device.laptop} {
      font-size: 14px;
    }
  }

  .book-link {
    font-size: 12px;
    text-decoration: underline;

    @media ${device.laptop} {
      font-size: 14px;
    }
  }
`
