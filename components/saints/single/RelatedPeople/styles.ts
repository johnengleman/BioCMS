import styled from 'styled-components'

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
    border-radius: 10px;
    box-shadow: -6px 6px 16px #e6e6e6, 6px -6px 16px #ffffff;

    img {
      border-radius: 10px;
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
    height: 150px;

    .name {
      font-size: 14px;
      font-weight: 700;
      line-height: 1.1;
      color: #2d2d2d;
    }

    .dates {
      font-size: 12px;
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
        background-color: #ccebd9;
        font-size: 10px;
        font-weight: 500;
        border-radius: 2px;
        color: #54846d;
        font-weight: 500;
        min-width: fit-content;
      }
    }

    .summary {
      color: #000;
      font-size: 12px;
      line-height: 1.25;
      margin-top: 15px;
      position: relative;
      height: 60px;

      &:before {
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
      }
    }
  }
`

export const RelatedPeople = styled.div`
  /* border-top: 1px solid #e4e2e2;
  padding-top: 1rem; */

  h3 {
    margin-bottom: 0.5rem;
  }

  .similar-saints-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    gap: 10px;
  }
`
