import styled from 'styled-components'

export const SaintSummary = styled.div`
  width: 300px;
  background: white;
  border: 3px solid #c3eaff;
  border-radius: 10px;
`

export const SliderContainer = styled.div`
  height: 300px;
  border-radius: 5px;
  overflow: hidden;
`

export const BioContainer = styled.div`
  position: relative;
  z-index: 1;
  width: 90%;
  margin: -20px auto 0 auto;
`

export const Tags = styled.div`
  display: flex;
  gap: 7px;
  margin: 10px 0;

  .tag {
    padding: 3px 15px;
    background-color: #ccebd9;
    font-size: 8px;
    border-radius: 5px;
    color: #54846d;
    letter-spacing: 1.1px;
    font-weight: 600;
  }
`

export const SummaryContainer = styled.div`
  margin: 0;
  padding: 1rem;
  border: 1px solid #f0f0f0;
  border-radius: 10px;
  box-shadow: 0 2px 10px 0 rgba(0, 0, 0, 0.1);
  width: 100%;
`

export const Summary = styled.div`
  color: #1a4760;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 12;
  -webkit-box-orient: vertical;
  overflow: hidden;

  p {
    font-size: 12px;
  }
`

export const Dates = styled.p`
  font-size: 10px;
  color: #676666c2;
  text-align: right;
`

export const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px;
`

export const FooterButton = styled.button`
  background: none;
  border: none;

  svg {
    vertical-align: baseline;
  }
`

export const Count = styled.span`
  color: #676666c2;
  font-size: 16px;
  font-weight: 600;
  margin-left: 7px;
`
