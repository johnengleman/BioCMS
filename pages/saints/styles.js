import styled from 'styled-components'
import headerBg from '../../resources/images/layered-waves-haikei.svg'

export const Header = styled.div`
  display: flex;
  gap: 10px;
  margin: 10px 0;
  background-image: url(${headerBg.src});
  background-size: cover;
  height: 350px;
  align-items: flex-end;
`

export const ImageContainer = styled.div`
  width: 260px;
  margin: 0 20px 20px 20px;
`

export const Image = styled.div`
  width: 225px;
  border-radius: 10px;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 4px 0 4px 0 rgba(0, 0, 0, 0.25);
`

export const SummaryContainer = styled.div`
  width: 35%;
  align-self: center;
  margin-bottom: 150px;
`

export const Summary = styled.div`
  color: #525252;
  margin: 40px 0 20px 0;
  font-size: 14px;
  line-height: 18px;
`

export const Pictures = styled.div`
  display: flex;
  align-content: flex-end;
  gap: 10px;
  align-items: flex-end;
  margin-bottom: 20px;

  img {
    border-radius: 5px;
  }
`
