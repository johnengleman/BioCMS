import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'

export const Saint = styled.div`
  .header {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    background-image: url(${headerBg.src});
    background-size: cover;
    align-items: flex-end;
    margin-bottom: 25px;
    height: 500px;
  }

  .quotes {
    display: flex;
    gap: 20px;
    margin-bottom: 25px;
  }

  .summary {
    color: #525252;
    margin: 40px 0 20px 0;
    font-size: 14px;
    line-height: 18px;
  }
`
