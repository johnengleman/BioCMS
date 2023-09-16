import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const RelatedPerson = styled.div`
  margin-bottom: 25px;
  width: calc(50% - 15px);
  border-radius: 10px;

  a {
    text-decoration: none;
    display: flex;
  }

  .image-global {
    height: 225px;
    width: 150px;
    margin-right: 15px;
    min-width: 150px;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 14px 28px,
      rgba(0, 0, 0, 0.22) 0px 10px 10px;

    img {
      min-height: 100%;
      min-width: 100%;
      object-fit: cover;
      border-radius: 5px;
    }
  }

  .person-info {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    padding: 15px 10px;
    position: relative;
    overflow: hidden;

    .name {
      font-size: 18px;
      font-weight: 700;
      line-height: 1.1;
      color: #2d2d2d;
    }

    .dates {
      font-size: 14px;
      color: #9b9b9b;
      font-weight: 400;
      margin-bottom: 10px;
    }

    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .tag {
        padding: 2px 12px;
        font-size: 12px;
        letter-spacing: 0.5px;
        border-radius: 4px;
        border: 1px solid #b6b6b6;
        color: #737373;
        min-width: fit-content;
      }
    }

    .summary {
      color: #737373;
      font-size: 14px;
      line-height: 1.25;
      margin-top: 15px;
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 6;
      -webkit-box-orient: vertical;
      overflow: hidden;

      /* &:before {
        content: '';
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 100%;
        border-bottom-right-radius: 15px;
        background: linear-gradient(
          to bottom,
          rgba(255, 255, 255, 0.5),
          #fff
        );
      } */
    }
  }
`

export const RelatedPeople = styled.div`
  h3 {
    margin-bottom: 0.5rem;
  }

  .similar-saints-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
`
