import styled from 'styled-components'
import { device } from '../../../styles/devices'

export const Search = styled.div`
  position: relative;
  display: none;

  @media ${device.tablet} {
    display: block;
  }

  .input {
    width: 180px;
    height: 40px;
    border-radius: 20px;
    border: 2px solid #dee2e6;
    font-size: 15px;
    outline: none;
    padding-left: 38px;
    font-weight: 400;
    transition: width 0.3s ease-in-out;

    &:focus {
      width: 220px;
    }
  }

  .input-wrapper {
    position: relative;
  }

  .search-icon {
    position: absolute;
    left: 8px; /* Adjust based on your design preference */
    top: 33%;
    left: 17px;
    font-size: 15px; /* Adjust based on your design preference */
    color: #7f7f7f; /* Adjust based on your design preference */
  }

  .dropdown-content {
    display: block;
    position: absolute;
    background-color: white;
    min-width: 290px;
    border: 1px solid #ddd;
    z-index: 1000;
    right: 0;
    top: 45px;
    width: fit-content;
    border-radius: 15px;
    transition: opacity 0.25s ease-in-out;

    &:empty {
      opacity: 0;
      border: none;
    }
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

    &:first-child {
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
    }

    &:last-child {
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 15px;
    }

    &:hover {
      background-color: #dee2e6;
    }

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

  .info {
    display: flex;
    flex-direction: column;
    margin-top: 3px;
  }

  .name {
    font-weight: 600;
    color: #333a3f;
    line-height: 1.2;
  }

  .dates {
    font-size: 12px;
    color: #7f7f7f;
  }

  /* Show the dropdown menu on hover */
  .dropdown:hover .dropdown-content {
    display: block;
  }
`
