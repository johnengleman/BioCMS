import styled from 'styled-components'

export const SaintSummary = styled.div``

export const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin-bottom: 10px;

  .tag {
    padding: 3px 15px;
    background-color: #ccebd9;
    font-size: 10px;
    font-weight: 500;
    border-radius: 5px;
    color: #54846d;
    letter-spacing: 1.1px;
    font-weight: 600;
  }
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 5px 10px 5px;

  .footer-button {
    background: none;
    border: none;

    svg {
      vertical-align: baseline;
    }
  }

  .dates {
    font-size: 10px;
    color: #676666c2;
    text-align: right;
  }
`

export const Count = styled.span`
  color: #676666c2;
  font-size: 14px;
  font-weight: 600;
  margin-left: 5px;
`
