import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const Book = styled.div`
  display: flex;
  gap: 20px;
  width: 100%;
  color: inherit;
  text-decoration: none;

  .image {
    width: 100px;
    min-width: 100px;
    max-width: 100px;

    img {
      border-radius: 5px;
    }
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

export const Books = styled.div`
  margin-bottom: 35px;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border: 1px solid rgb(221, 221, 221);
  border-radius: 12px;
  padding: 30px;

  @media ${device.tablet} {
    margin-bottom: 50px;
  }

  .books-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: flex-start;
  }
`
