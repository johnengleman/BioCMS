import styled from 'styled-components'
import { device } from '../../../../styles/devices'

export const Book = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 150px;
  color: inherit;
  text-decoration: none;
  align-items: center;
  margin-bottom: 2rem;

  .image {
    height: 225px;
    width: auto;

    img {
      height: 100%;
      object-fit: cover;
      border-radius: 7px;
      border: 1px solid #acabab;
    }
  }

  .book-name {
    font-size: 14px;
    font-weight: 600;
    line-height: 1.2;
    width: 100%;
    color: #2b2b2b;
  }

  .book-author {
    font-size: 13px;
    color: #9b9b9b;
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
  padding-top: 1rem;

  h3 {
    margin-bottom: 0.5rem;
  }

  .books-container {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: flex-start;
  }
`
