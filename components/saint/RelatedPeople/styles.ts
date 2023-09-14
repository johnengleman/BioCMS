import styled from 'styled-components'
import { colors } from '../../../styles/colors'

export const RelatedPerson = styled.div`
  margin-bottom: 20px;
  width: calc(50% - 15px);
  border-radius: 10px;

  a {
    text-decoration: none;
    display: flex;
  }

  .image-global {
    margin-right: 10px;
    box-shadow: -6px 6px 16px #e6e6e6, 6px -6px 16px #ffffff;

    img {
      border-radius: 5px;
      object-fit: cover;
      border: 1px solid #acabab;
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
      font-size: 13px;
      line-height: 1.25;
      margin-top: 15px;
      position: relative;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 4;
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
    /* border: 1px solid rgb(221, 221, 221);
    box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
    border-radius: 12px;
    padding: 24px; */
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    gap: 10px;
  }
`
