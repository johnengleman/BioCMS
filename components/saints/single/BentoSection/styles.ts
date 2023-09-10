import styled from 'styled-components'

export const BentoSection = styled.div`
  width: calc(50% - 0.5rem);
  display: flex;
  flex-direction: column;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 16px;
  border: 1px solid rgb(100, 99, 99);
  border-radius: 10px;
  font-size: 18px;
  font-weight: 400;
  color: #ffffff;
  padding: 30px 40px;
  position: relative;
  background: linear-gradient(
    140deg,
    rgba(0, 0, 0, 1) 0%,
    rgba(11, 7, 43, 1) 100%
  );
  overflow: hidden;
  max-height: 400px;
  cursor: pointer;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0px 6px 16px;
  }

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;

    h3 {
      font-weight: 500;
      color: #e8e8e8;
      font-size: 18px;
    }

    .word-count {
      font-size: 12px;
      color: rgba(141, 137, 172, 1);
      margin-left: 5px;
      font-weight: 300;
      position: absolute;
      right: 30px;
    }
  }

  .toc {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    font-size: 13px;
    line-height: 1.3;
    flex-direction: column;
    gap: 5px;
    color: #d8d8d8;
  }

  .footer {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  }

  button {
    background: transparent;
    border-radius: 7px;
    color: rgba(141, 137, 172, 1);
    font-size: 12px;
    width: min-content;
    padding: 5px 40px;
    border: 2px solid rgba(141, 137, 172, 1);
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
      border: 2px solid #bababa;
      color: #bababa;
    }
  }
`
