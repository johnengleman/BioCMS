import styled from 'styled-components'

export const Related = styled.div`
  display: flex;

  img,
  .placeholder {
    margin-right: 10px;
    border-radius: 5px;
  }

  .placeholder {
    height: 150px;
    width: 100px;
    min-width: 100px;
    border-radius: 3px;
    background: lightgray;
  }

  .person-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .relationship {
      font-size: 14px;
      line-height: 1;
      margin-bottom: 0.3rem;
    }

    .name {
      font-size: 16px;
      font-weight: 700;
      line-height: 1.1;
    }
  }
`
