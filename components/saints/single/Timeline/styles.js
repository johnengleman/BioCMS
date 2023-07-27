import styled from 'styled-components'

export const Timeline = styled.div`
  width: 100%;
  margin-bottom: 20px;

  .dates,
  .locations {
    display: flex;
    justify-content: space-between;
  }
  .dates {
    font-size: 12px;
    color: #1d1e1c;
    font-weight: 700;
  }

  .locations {
    font-size: 10px;
    color: #a1a1a1;
    font-weight: 600;
  }

  .bar {
    height: 2px;
    width: 100%;
    background-color: #d0d0d0;
  }
`
