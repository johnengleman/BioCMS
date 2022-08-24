import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'

export const Saint = styled.div`
  .header {
    display: flex;
    gap: 10px;
    margin: 10px 0;
    background-image: url(${headerBg.src});
    background-size: cover;
    height: 330px;
    align-items: flex-end;
    margin-bottom: 25px;
  }

  .quotes {
    display: flex;
    gap: 20px;
  }
`
