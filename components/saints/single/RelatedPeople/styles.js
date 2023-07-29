import styled from 'styled-components'

export const Related = styled.div`
  display: flex;

  img,
  .placeholder {
    margin-right: 10px;
    border-radius: 5px;
  }

  .placeholder {
    height: 100px;
    width: 75px;
    min-width: 75px;
    border-radius: 5px;
    background: lightgray;
  }

  .person-info {
    display: flex;
    flex-direction: column;
    justify-content: center;

    .relationship {
      font-size: 1rem;
      line-height: 1;
      margin-bottom: 0.3rem;
    }

    .name {
      font-size: 1rem;
      font-weight: 700;
      line-height: 1.1;
    }
  }
`
