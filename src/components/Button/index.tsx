import React from 'react';
import { CellState, CellValue } from '../../@types';

import { Container } from './styles';

interface IButtonProps {
  row: number;
  col: number;
  red?: boolean;
  state: CellState;
  value: CellValue;
  onClick(
    rowParamater: number,
    colParamater: number,
  ): (e: React.MouseEvent) => void;
  onContext(
    rowParamater: number,
    colParamater: number,
  ): (e: React.MouseEvent) => void;
}

const Button: React.FC<IButtonProps> = ({
  row,
  col,
  red,
  onContext,
  onClick,
  state,
  value,
}) => {
  const renderContente = (): React.ReactNode => {
    if (state === CellState.visible) {
      if (value === CellValue.mine) {
        return '💣';
      } else if (value === CellValue.none) {
        return null;
      }

      return value;
    } else if (state === CellState.flagged) {
      return '🚩';
    }
    return null;
  };

  return (
    <Container
      visible={state === CellState.visible}
      oneMine={value === CellValue.one}
      twoMines={value === CellValue.two}
      threeMines={value === CellValue.three}
      fourMines={value === CellValue.four}
      fiveMines={value === CellValue.five}
      sixMines={value === CellValue.six}
      sevenMines={value === CellValue.seven}
      eightMines={value === CellValue.eight}
      red={red === true}
      onClick={onClick(row, col)}
      onContextMenu={onContext(row, col)}
    >
      {renderContente()}
    </Container>
  );
};

export default Button;
