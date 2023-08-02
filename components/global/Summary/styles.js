import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const Summary = styled.div`
  width: 300px;
  background: white;
  border: 1px solid lavender;
  border-radius: 20px;
  position: relative;
  background-color: ${colors.mint};
  box-shadow: -5px 4px 46px -5px rgba(0, 0, 0, 0.74);
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.02);
    }
  }

  .image {
    width: 100%;
    position: relative;
    height: 300px;
    z-index: 2;

    img {
      transition: all 0.5s ease-in-out;
      object-fit: cover;
      object-position: 50% 10%;
      border-radius: 20px;
    }
  }

  .bioContainer {
    position: relative;
    z-index: 1;
    width: 90%;
    padding: 1rem 1rem 0.5rem 1rem;
    border-radius: 10px;
    width: 100%;

    .summary {
      color: #1a4760;
      margin-top: 10px;
      margin-bottom: 10px;
      display: -webkit-box;
      -webkit-line-clamp: 8;
      -webkit-box-orient: vertical;
      overflow: hidden;
      font-size: 14px;
    }
  }
`
