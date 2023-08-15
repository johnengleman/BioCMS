import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Search = styled.div`
  position: relative;
  display: none;

  @media ${device.tablet} {
    display: block;
  }

  .input {
    width: 200px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid #dee2e6;
    font-size: 16px;
    outline: none;
    padding-left: 40px;
    font-weight: 400;
  }

  .input-wrapper {
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 10px; /* Adjust based on your design preference */
    top: 31%;
    left: 17px;
    font-size: 16px; /* Adjust based on your design preference */
    color: #7f7f7f; /* Adjust based on your design preference */
  }

  .dropdown-content {
    display: block;
    position: absolute;
    background-color: white;
    min-width: 270px;
    border: 1px solid #ddd;
    z-index: 1000;
    right: 0;
    top: 50px;
    width: fit-content;
    border-radius: 15px;
  }

  .dropdown-content .result {
    color: black;
    text-decoration: none;
    display: block;
    cursor: pointer;
    height: 50px;
    display: flex;
    align-items: center;
    font-size: 14px;
    width: fit-content;
    width: 100%;
    border-bottom: 1px solid #dee2e6;

    &:last-child {
      border-bottom: none;
    }
  }

  .profile {
    height: 35px;
    width: 35px;
    min-width: 35px;
    border-radius: 50%;
    margin: 0 15px;
    overflow: hidden;
  }

  .name {
    font-weight: 600;
    color: #333a3f;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }
`
