import { CellValue, CellState, Cell } from '../@types/index';

const adjacentCells = (
  cells: Cell[][],
  rowParameter: number,
  colParameter: number,
): {
  topLeftCell: Cell | null;
  topCell: Cell | null;
  topRightCell: Cell | null;
  leftCell: Cell | null;
  rightCell: Cell | null;
  bottomLeftCell: Cell | null;
  bottomCell: Cell | null;
  bottomRightCell: Cell | null;
} => {
  const topLeftCell =
    rowParameter > 0 && colParameter > 0
      ? cells[rowParameter - 1][colParameter - 1]
      : null;
  const topCell =
    rowParameter > 0 ? cells[rowParameter - 1][colParameter] : null;
  const topRightCell =
    rowParameter > 0 && colParameter < 9 - 1
      ? cells[rowParameter - 1][colParameter + 1]
      : null;
  const leftCell =
    colParameter > 0 ? cells[rowParameter][colParameter - 1] : null;
  const rightCell =
    colParameter < 9 - 1 ? cells[rowParameter][colParameter + 1] : null;
  const bottomLeftCell =
    rowParameter < 9 - 1 && colParameter > 0
      ? cells[rowParameter + 1][colParameter - 1]
      : null;
  const bottomCell =
    rowParameter < 9 - 1 ? cells[rowParameter + 1][colParameter] : null;
  const bottomRightCell =
    rowParameter < 9 - 1 && colParameter < 9 - 1
      ? cells[rowParameter + 1][colParameter + 1]
      : null;

  return {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  };
};

export const generateCells = (): Cell[][] => {
  let cells: Cell[][] = [];

  for (let i = 0; i < 9; i++) {
    cells.push([]);
    for (let j = 0; j < 9; j++) {
      cells[i].push({
        value: CellValue.none,
        state: CellState.default,
      });
    }
  }

  let mines = 0;
  while (mines < 10) {
    const randomRow = Math.floor(Math.random() * 9);
    const randomCol = Math.floor(Math.random() * 9);

    const currentCell = cells[randomRow][randomCol];
    if (currentCell.value !== CellValue.mine) {
      cells = cells.map((row, rowIndex) =>
        row.map((cell, colIndex) => {
          if (randomRow === rowIndex && randomCol === colIndex) {
            return {
              ...cell,
              value: CellValue.mine,
            };
          }

          return cell;
        }),
      );
      mines++;
    }
  }

  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      const currentCell = cells[i][j];

      if (currentCell.value === CellValue.mine) {
        continue;
      }

      let minesTotal = 0;
      const {
        topLeftCell,
        topCell,
        topRightCell,
        leftCell,
        rightCell,
        bottomLeftCell,
        bottomCell,
        bottomRightCell,
      } = adjacentCells(cells, i, j);

      if (topLeftCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (topCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (topRightCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (leftCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (rightCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (bottomLeftCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (bottomCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (bottomRightCell?.value === CellValue.mine) {
        minesTotal++;
      }

      if (minesTotal > 0) {
        cells[i][j] = {
          ...currentCell,
          value: minesTotal,
        };
      }
    }
  }

  return cells;
};

export const openCells = (
  cells: Cell[][],
  rowParameter: number,
  colParameter: number,
): Cell[][] => {
  const currentCell = cells[rowParameter][colParameter];

  if (
    currentCell.state === CellState.visible ||
    currentCell.state === CellState.flagged
  ) {
    return cells;
  }

  let cellsCopy = cells.slice();
  cellsCopy[rowParameter][colParameter].state = CellState.visible;

  const {
    topLeftCell,
    topCell,
    topRightCell,
    leftCell,
    rightCell,
    bottomLeftCell,
    bottomCell,
    bottomRightCell,
  } = adjacentCells(cells, rowParameter, colParameter);

  if (
    topLeftCell?.state === CellState.default &&
    topLeftCell.value !== CellValue.mine
  ) {
    if (topLeftCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter - 1, colParameter - 1);
    } else {
      cellsCopy[rowParameter - 1][colParameter - 1].state = CellState.visible;
    }
  }

  if (
    topCell?.state === CellState.default &&
    topCell.value !== CellValue.mine
  ) {
    if (topCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter - 1, colParameter);
    } else {
      cellsCopy[rowParameter - 1][colParameter].state = CellState.visible;
    }
  }

  if (
    topRightCell?.state === CellState.default &&
    topRightCell.value !== CellValue.mine
  ) {
    if (topRightCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter - 1, colParameter + 1);
    } else {
      cellsCopy[rowParameter - 1][colParameter + 1].state = CellState.visible;
    }
  }

  if (
    leftCell?.state === CellState.default &&
    leftCell.value !== CellValue.mine
  ) {
    if (leftCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter, colParameter - 1);
    } else {
      cellsCopy[rowParameter][colParameter - 1].state = CellState.visible;
    }
  }

  if (
    rightCell?.state === CellState.default &&
    rightCell.value !== CellValue.mine
  ) {
    if (rightCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter, colParameter + 1);
    } else {
      cellsCopy[rowParameter][colParameter + 1].state = CellState.visible;
    }
  }

  if (
    bottomLeftCell?.state === CellState.default &&
    bottomLeftCell.value !== CellValue.mine
  ) {
    if (bottomLeftCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter + 1, colParameter - 1);
    } else {
      cellsCopy[rowParameter + 1][colParameter - 1].state = CellState.visible;
    }
  }

  if (
    bottomCell?.state === CellState.default &&
    bottomCell.value !== CellValue.mine
  ) {
    if (bottomCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter + 1, colParameter);
    } else {
      cellsCopy[rowParameter + 1][colParameter].state = CellState.visible;
    }
  }

  if (
    bottomRightCell?.state === CellState.default &&
    bottomRightCell.value !== CellValue.mine
  ) {
    if (bottomRightCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter + 1, colParameter + 1);
    } else {
      cellsCopy[rowParameter + 1][colParameter + 1].state = CellState.visible;
    }
  }

  return cellsCopy;
};
