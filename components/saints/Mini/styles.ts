import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const Mini = styled.div`
  .saint-mini {
    position: relative;
    display: flex;
    height: 100%;
    margin: 20px;
    height: 240px;
    width: 500px;
    margin-bottom: 20px;
    border: 1px solid rgb(221, 221, 221);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
    border-radius: 12px;
    gap: 20px;

    &:first-child {
      margin-left: 0;
    }
  }

  .image {
    height: 100%;
    width: 150px;
    min-width: 150px;
    z-index: 2;
    position: relative;

    img {
      transition: transform 0.5s ease;
      object-fit: cover;
      /* border-bottom-left-radius: 10px;
      border-top-left-radius: 10px; */
      border-radius: 10px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 3px 8px;
    }
  }

  .bio {
    padding: 10px 20px 20px 0;
    color: #222;

    h2 {
      font-size: 16px;
      color: #333;
      margin-bottom: 3px;
    }

    p {
      line-height: 1.3;
      font-size: 13px;
      color: #626262;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
      margin-bottom: 0.5rem;
      margin-top: 1rem;

      .tag {
        padding: 2px 12px;
        font-size: 10px;
        letter-spacing: 0.5px;
        border-radius: 4px;
        color: #a1a1a1;
        min-width: fit-content;
        border: 1px solid #c6c6c6;
      }
    }

    .header {
      margin-bottom: 1rem;
      color: #333;

      .death {
        font-size: 12px;
        display: flex;
        line-height: 1;
        gap: 5px;
        align-items: center;
      }
    }
  }
`
