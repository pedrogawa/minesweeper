import styled, { css } from 'styled-components';

interface IContainerProps {
  visible: boolean;
  oneMine: boolean;
  twoMines: boolean;
  threeMines: boolean;
  fourMines: boolean;
  fiveMines: boolean;
  sixMines: boolean;
  sevenMines: boolean;
  eightMines: boolean;
  red?: boolean;
}

export const Container = styled.div<IContainerProps>`
  width: 30px;
  height: 30px;
  border-bottom-color: #7b7b7b;
  border-right-color: #7b7b7b;
  border-left-color: white;
  border-top-color: white;
  font-weight: bold;

  border-style: solid;
  border-width: 4px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  ${({ visible }) =>
    visible &&
    css`
      border-color: #7b7b7b;
      border-width: 1px;
    `}

  ${({ red }) =>
    red &&
    css`
      background: red;
    `}

  ${({ oneMine }) =>
    oneMine &&
    css`
      color: blue;
    `}

  ${({ twoMines }) =>
    twoMines &&
    css`
      color: green;
    `}

  ${({ threeMines }) =>
    threeMines &&
    css`
      color: red;
    `}

  ${({ fourMines }) =>
    fourMines &&
    css`
      color: purple;
    `}

  ${({ fiveMines }) =>
    fiveMines &&
    css`
      color: maroon;
    `}

  ${({ sixMines }) =>
    sixMines &&
    css`
      color: turquoise;
    `}

  ${({ sevenMines }) => sevenMines && css``}

  ${({ eightMines }) =>
    eightMines &&
    css`
      color: gray;
    `}


  &:active {
    border-bottom-color: white;
    border-right-color: white;
    border-left-color: #7b7b7b;
    border-top-color: #7b7b7b;
  }
`;
