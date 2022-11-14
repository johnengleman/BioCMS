import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'

export const Saint = styled.div`
  .col {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .header {
    display: flex;
    gap: 10px;
    margin: 20px 0;
    background-image: url(${headerBg.src});
    background-size: cover;
    align-items: flex-end;
    margin-bottom: 25px;
    height: 450px;
  }

  .quotes {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }

  .summary {
    color: #525252;
    font-weight: 500;
    margin: 40px 0 20px 0;
    font-size: 16px;
    line-height: 1.3;
    max-width: 80%;
  }
`
