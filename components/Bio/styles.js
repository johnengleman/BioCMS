import styled from 'styled-components';

export const SaintStyled = styled.div`
  border: 3px solid #dea34b;
  border-radius: 10px;
  width: 260px;

  .c-photo {
    height: 250px;
    width: 100%;
    position: relative;
    border-top-left-radius: 9px;
    border-top-right-radius: 8px;
    overflow: hidden;
    background-color: #000;

    img {
      object-fit: contain;
    }

    .photo-main {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .photo-mini {
      position: absolute;
      bottom: 25px;
      border-radius: 10px;
      border: 1px solid white;
      overflow: hidden;
      cursor: pointer;
      height: 50px;
      width: 50px;
      background-color: #000;
    }

    .mini-left {
      left: 10px;
    }

    .mini-right {
      right: 10px;
    }
  }

  .c-bio {
    background-color: #fff;
    padding: 0 1rem;
    position: relative;
    padding-top: 20px;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid transparent;

    .name {
      background: #342d2d;
      border: 2px solid #f2f2f2;
      color: white;
      text-align: center;
      margin: 0 auto;
      font-size: 14px;
      border-radius: 3px;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
      margin-bottom: 0.8rem;
      position: absolute;
      width: 90%;
      left: 5%;
      top: -15px;
      height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bio {
      font-size: 12px;
      margin: 0 auto 1rem auto;
      border-left: 5px solid #f2f2f2;
      padding-left: 0.5rem;
      display: -webkit-box;
      -webkit-line-clamp: 10;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin-top: 10px;

      p:first-of-type {
        margin-top: 0;
      }
    }

    .c-dates {
      background-color: #f2f2f2;
      margin: 0 auto;
      padding: 10px 5px;
      display: flex;
      justify-content: space-between;
      margin-bottom: 1rem;

      .birth,
      .death {
        display: flex;
        flex-direction: column;
        padding: 0 10px;
        justify-content: center;
      }

      .death {
        align-items: end;
      }

      .year {
        color: #6d6d6d;
        font-size: 11px;
        font-weight: 500;
      }

      .place {
        color: #736f6f;
        font-size: 9px;
        font-weight: 400;
      }
    }

    .c-relics {
      margin-bottom: 1rem;

      .title {
        color: #7d4b4b;
        font-size: 10px;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      padding-bottom: 0.5rem;
    }

    .btn {
      height: 20px;
      font-size: 9px;
      padding: 0 7px;
      border-radius: 8px;
      background-color: #bea5a5;
      color: #342d2d;
      border: 0.5px solid #fff;
      display: flex;
      align-items: center;
      font-weight: 600;
      box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25), 0 -1px 4px rgba(0, 0, 0, 0.25);
      cursor: pointer;

      .count {
        border-radius: 12px;
        height: 12px;
        width: 12px;
        margin-left: 7px;
        background: #cecece;
        color: #424242;
        font-size: 9px;
        font-weight: 600;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
`;
