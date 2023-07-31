import styled from 'styled-components'

export const ImagesModal = styled.div`
  .my-masonry-grid {
    display: flex;
    margin-left: -10px; /* gutter size offset */
    width: auto;
  }
  .my-masonry-grid_column {
    padding-left: 10px; /* gutter size */
    background-clip: padding-box;
  }

  /* Style your items */
  .my-masonry-grid_column > img {
    /* change div to reference your elements you put in <Masonry> */
    background: grey;
    margin-bottom: 10px;
  }
`
