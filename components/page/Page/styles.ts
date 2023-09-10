import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Page = styled.div`
  min-height: 100vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const Body = styled.main`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  gap: 1rem;
  width: 75%;
  max-width: 1350px;
  min-height: calc(100vh - 450px - 150px);
  padding: 30px 0 50px 0;

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
