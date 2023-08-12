import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Page = styled.div`
  min-height: 100vh;
`

export const Body = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 1rem;
  width: 95%;
  max-width: 1420px;
  margin-top: 25px;

  @media ${device.laptop} {
    margin-top: 20px;
    width: 90%;
  }

  .my-masonry-grid {
    display: flex;
    width: auto;
    margin-left: -15px;
  }
  .my-masonry-grid_column {
    padding-left: 15px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column .saint-summary {
    /* change div to reference your elements you put in <Masonry> */
    background: white;
    margin-bottom: 15px;
  }
`
