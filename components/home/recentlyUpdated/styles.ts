import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { variables } from '../../../styles/colors'

export const RecentlyUpdated = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  margin: 20px 0;
  padding: 20px 0;
  border-radius: 8px;

  .header-container {
    width: 95%;
    max-width: 1350x;
    margin: 0 auto;

    h1,
    h2 {
      margin-bottom: 20px;
      font-size: 1.2rem;
    }
  }

  .saints-container {
    display: flex;
    gap: 20px;
    margin: 30px 0;
    width: 100%;
  }

  .embla__next,
  .embla__prev {
    position: absolute;
    height: 50px;
    min-width: 50px;

    svg {
      transform: scale(1.5);
    }
  }

  .embla__next {
    right: 50px;
  }

  .embla__prev {
    left: 50px;
  }
`
