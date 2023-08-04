import styled from 'styled-components'

export const ChurchSummary = styled.div`
  width: 400px;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.02);
    }
  }

  .image {
    width: 100%;
    position: relative;
    height: 225px;
    z-index: 2;
    margin-bottom: 10px;

    img {
      transition: all 0.5s ease-in-out;
      object-fit: cover;
      object-position: 50% 10%;
      border-radius: 10px;
      border: 1px solid lightgray;
    }
  }

  .name {
    font-weight: 700;
  }

  p {
    color: #1a4760;
  }
`
