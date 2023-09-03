import styled from 'styled-components'

export const ChurchToggle = styled.div`
  border-radius: 7px;
  height: fit-content;
  width: fit-content;

  .button {
    position: absolute;
    border-radius: 7px;
    z-index: 0;
    transition: all 0.15s ease-in-out;
    background-color: #fff;
    border: 1px solid #ddd;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 3px 0;
    display: flex;
    position: relative;

    li {
      list-style: none;
      padding: 4px 10px;
      font-size: 11px;
      color: #fff;
      font-weight: 550;
      cursor: pointer;
      transition: all 0.15s ease-in-out;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 5px;
      text-transform: uppercase;
      border: 1px solid transparent;
      border-radius: 7px;
      margin-right: 3px;
      line-height: 1;

      &:last-child {
        margin-right: 0;
      }

      &:not(.active):hover {
        border: 1px solid #bdbdbd;
      }

      svg g {
        fill: #fff;
        transition: all 0.15s ease-in-out;
      }

      &.active {
        color: #000;
        font-weight: 550;

        svg g {
          fill: #000;
        }
      }
    }
  }
`
