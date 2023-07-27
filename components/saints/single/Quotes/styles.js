import styled from 'styled-components'

export const Quote = styled.div`
  flex: 1;
  min-width: 30%;
  border-radius: 5px;
  padding: 15px;
  background-color: #cceff6;
  margin-right: 10%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 30px;

  .c-text {
    background-color: #d9d9d9;
    padding: 10px 20px;
    border-radius: 5px;
    width: calc(100% + 35px);
    box-shadow: 0 0.0625rem 0.1875rem rgba(0, 0, 0, 0.05),
      0 0.0625rem 0.125rem rgba(0, 0, 0, 0.1);

    .text {
      color: #353535;
      font-size: 12px;
      line-height: 1.5;
      font-weight: 600;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
      text-align: left;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin: 15px 5px 0 5px;

    .c-topics {
      .topic {
        font-size: 10px;
        text-transform: uppercase;
        color: #5c8088;
      }
    }

    .quoteNumber {
      font-size: 10px;
      color: #5c8088;
    }
  }
`

export const SlideContainer = styled.div`
  .mantine-Carousel-container {
    align-items: center;
  }
`
