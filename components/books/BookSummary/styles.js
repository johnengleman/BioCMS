import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const BookSummary = styled.div`
  width: 250px;
  cursor: pointer;

  &:hover {
    img {
      transform: scale(1.02);
    }
  }

  a {
    text-decoration: none;
  }

  .image {
    width: 100%;
    position: relative;
    height: 350px;
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

  .info {
    height: 100px;

    .title {
      font-size: 16px;
      line-height: 1.1;
      font-weight: 600;
      color: ${colors.brown};
      margin-bottom: 7px;
    }

    .author {
      font-size: 14px;
      line-height: 1.1;
      color: ${colors.sienna};
      margin-bottom: 20px;
    }
  }

  .amazon {
    display: flex;
    align-items: center;
    gap: 8px;
    background: ${colors.sienna};
    width: 100%;
    padding: 8px;
    border-radius: 10px;
    display: flex;
    justify-content: center;

    p {
      font-size: 12px;
      line-height: 1.1;
      font-weight: 600;
      color: #fff;
    }
  }
`
