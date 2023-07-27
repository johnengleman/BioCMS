import styled from 'styled-components'

export const Church = styled.div`
  height: 150px;
  display: flex;
  gap: 10px;
  width: calc(33% - 20px);

  a {
    color: inherit;
  }

  .church-image {
    min-width: 100px;
  }

  .church-info {
    width: 300px;
    margin-top: 5px;
  }

  .church-name {
    font-size: 14px;
    font-weight: 700;
    line-height: 1;
    margin-bottom: 10px;
    width: 100%;
  }

  .church-link {
    font-size: 12px;
    text-decoration: underline;
  }
`
