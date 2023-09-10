import styled from 'styled-components'

export const NameTag = styled.div`
  margin-bottom: 15px;

  .name {
    font-size: 26px;
    font-weight: 600;
    line-height: 1;
  }

  .info {
    margin-top: 10px;
    display: flex;
    align-items: center;
    gap: 5px;

    p {
      font-size: 14px;
      font-weight: 600;
    }

    .date {
      color: #9b9b9b;
      font-size: 14px;
    }

    .tag {
      padding: 2px 12px;
      background-color: #ccebd9;
      font-size: 10px;
      font-weight: 500;
      border-radius: 5px;
      color: #54846d;
      font-weight: 600;
      min-width: fit-content;
    }
  }
`
