import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Page = styled.div`
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
`

export const Body = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 1rem;
  flex-direction: column;
  align-items: center;

  .my-masonry-grid {
    display: flex;
    width: auto;
    margin-left: -15px;
  }
  .my-masonry-grid_column {
    padding-left: 20px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column .saint-summary {
    /* change div to reference your elements you put in <Masonry> */

    margin-bottom: 20px;
    border-radius: 20px;
  }
`
