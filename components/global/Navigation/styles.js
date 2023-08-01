import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Container = styled.div`
  margin-bottom: 10px;
  box-shadow: 0 5px 10px 0 rgba(0, 0, 0, 0.1);
`

export const Navigation = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 0 auto;
  height: 60px;

  @media ${device.laptop} {
    width: 80%;
    justify-content: flex-start;
  }

  ul {
    display: flex;
    gap: 5px;
    padding: 0;
  }
`

export const Button = styled.li`
  transition: all cubic-bezier(0.215, 0.61, 0.355, 1);
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid transparent;
  padding: 2px 15px;

  @media ${device.tablet} {
    padding: 2px 20px;
  }

  a {
    transition: all cubic-bezier(0.215, 0.61, 0.355, 1);
    text-decoration: none;
    color: #464646;
    opacity: 0.7;
  }
  &:hover {
    border: 1px solid lightgray;
    a {
      opacity: 1;
    }
  }
`
