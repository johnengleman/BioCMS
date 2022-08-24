import styled from 'styled-components'

export const Quote = styled.div`
  flex: 1;
  min-width: 30%;
  border: 1px solid #dcdcdc;
  border-radius: 10px;
  padding: 20px;

  .text {
    color: #353535;
    font-size: 12px;
    line-height: 1.3;
    font-weight: 600;
    margin-bottom: 20px;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
`
