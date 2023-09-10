import styled from 'styled-components'

export const Toggle = styled.div`
  position: absolute;
  bottom: -10px;
  left: calc((100% - 230px) / 2);

  .selected {
    font-size: 14px;
    font-weight: 600;
    background-color: #2f4f3a;
    padding: 10px 30px;
    color: #dadada;
    cursor: pointer;
    border-radius: 5px;
    font-weight: 300;
    border: 1px solid #676767;

    .direction {
      text-decoration: underline;
    }
  }

  .dropdown {
    position: absolute;
    top: 40px;
    right: 0;
    width: 225px;
    background-color: lavender;
    border-radius: 5px;
    display: none;
    z-index: 2;
    box-shadow: -2px 4px 10px 0px #121023;

    &.visible {
      display: block;
    }

    ul {
      margin: 0;
      padding: 10px 0;
      list-style: none;
      border-radius: 5px;

      li {
        padding: 5px 20px;
        width: max-content;
        margin: 0;
        width: 100%;
        cursor: pointer;
        color: #333;

        &:hover {
          background-color: #999;
        }
      }
    }
  }
`
