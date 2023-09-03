import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Container = styled.div`
  background-image: url('/footer.webp');
  background-size: cover; /* This will cover the entire viewport */
  background-repeat: no-repeat; /* Important if the image is smaller than the footer */
  background-position: center 45%; /* This will center the image */
  height: 150px; /* Or whatever height you want */
  margin-bottom: 50px;
  position: relative;
  border-bottom: 2px solid #522900;
  border-top: 1px solid transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
`
export const Row = styled.div`
  width: 95%;
  max-width: 1350px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
`

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 0 auto;
  max-width: 1350px;
  flex-direction: column;

  @media ${device.tablet} {
    flex-direction: row;
  }

  ul.pages {
    display: flex;
    gap: 5px;
    padding: 0;
    margin: 0;

    li:first-child {
      margin-left: -20px;
    }
  }

  .rightItems {
    display: flex;
    gap: 5px;
    align-items: center;
  }
`

export const Button = styled.li`
  transition: all cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 2px 15px;
  list-style-type: none;

  @media ${device.tablet} {
    padding: 2px 20px;
  }

  a {
    transition: all cubic-bezier(0.215, 0.61, 0.355, 1);
    text-decoration: none;
    letter-spacing: 1px;
    color: #fff;
    font-weight: 600;
    font-size: 16px;
    opacity: 1;
    border-bottom: 3px solid transparent;
    transition: border 0.1s ease-in-out;

    &:hover {
      border-bottom: 3px solid white;
    }
  }
`
