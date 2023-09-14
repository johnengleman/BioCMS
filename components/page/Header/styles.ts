import styled from 'styled-components'
import { device } from '../../../styles/devices'
import { colors } from '../../../styles/colors'

export const Header = styled.div<{ transparent: boolean }>`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 5px 20px -3px rgba(0, 0, 0, 0.1);

  &:before {
    display: ${(props) =>
      props.transparent ? 'block' : 'none'};
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 200px;
    background-image: linear-gradient(
        to right,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.5)
      ),
      url('/footer.webp');
    background-size: cover; /* This will cover the entire viewport */
    background-repeat: no-repeat; /* Important if the image is smaller than the footer */
    background-position: center 40%; /* This will center the image */
    transform: scaleX(-1);
    z-index: 0;
  }

  .content {
    width: 90%;
    max-width: 1450px;
    margin: 0 auto;
    display: flex;
    position: relative;
    z-index: 2;
  }

  .row {
    display: flex;
    align-items: center;

    &.row-1 {
      height: 60px;
    }

    .col {
      flex: 1;
      display: flex;
      align-items: center;
    }

    .center {
      justify-content: center;
    }

    .left {
      justify-content: flex-start;
    }

    .right {
      justify-content: flex-end;
    }
  }
`

export const Navigation = styled.div<{
  transparent: boolean
}>`
  gap: 10px;

  a {
    color: ${(props) =>
      props.transparent ? '#fff' : '#333'};
    font-size: 14px;
    padding: 4px 10px;
    font-weight: 500;
    letter-spacing: 0.5px;
    transition: all 0.2s ease-in-out;
    cursor: pointer;

    &:hover {
      color: #999;
    }
  }
`
