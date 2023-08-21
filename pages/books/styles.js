import styled from 'styled-components'
import { device } from '../../styles/devices'
import { variables } from '../../styles/colors'

export const Books = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  justify-content: center;

  @media ${device.mobileL} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`

export const ByGenre = styled.div``

export const ByAuthor = styled.div`
  min-width: 300px;
  width: 300px;

  h3 {
    color: ${variables.headlineColor};
    margin-bottom: 20px;
  }
`

export const TopAuthorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`

export const Container = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: column;

  @media ${device.laptop} {
    flex-direction: row;
  }
`
