import styled from 'styled-components'

export const BooksContainer = styled.div`

  }
`

export const Book = styled.div`
  height: 150px;
  max-width: 300px;
  width: 300px;
  display: flex;
  gap: 10px;

  a {
    color: inherit;
  }

  .book-image {
    min-width: 100px;
  }

  .book-info {
    width: 200px;
  }

  .book-name {
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 5px;
  }

  .book-author {
    font-size: 12px;
    color: #807b7b;
    margin-bottom: 10px;
  }

  .book-link {
    font-size: 12px;
    text-decoration: underline;
  }
`
