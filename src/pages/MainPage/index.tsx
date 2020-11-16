import React, { useEffect, useState } from 'react';

import NumberDisplay from '../../components/NumberDisplay';
import Button from '../../components/Button';
import { generateCells, openCells } from '../../utils';

import { Container, Header, Body, Face } from './styles';
import { Cell, CellState, CellValue } from '../../@types';

const MainPage: React.FC = () => {
  const [cells, setCells] = useState(generateCells());
  const [face, setFace] = useState('😃');
  const [time, setTime] = useState(0);
  const [isLive, setIsLive] = useState(false);
  const [counter, setCounter] = useState(10);
  const [lost, setLost] = useState(false);
  const [won, setWon] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => {
      setFace('😲');
    };

    const handleMouseUp = () => {
      setFace('😀');
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (isLive && time < 999) {
      const timer = setInterval(() => {
        setTime(time + 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [isLive, time]);

  useEffect(() => {
    if (lost) {
      setFace('😵');
      setIsLive(false);
    }
  }, [lost]);

  useEffect(() => {
    if (won) {
      setIsLive(false);
      setFace('😎');
    }
  }, [won]);

  const handleClick = (rowParameter: number, colParameter: number) => () => {
    let cellsCopy = cells.slice();

    if (!isLive) {
      let isMine =
        cellsCopy[rowParameter][colParameter].value === CellValue.mine;

      while (isMine) {
        cellsCopy = generateCells();
        if (cellsCopy[rowParameter][colParameter].value !== CellValue.mine) {
          isMine = false;
          break;
        }
      }

      setIsLive(true);
    }

    const currentCell = cellsCopy[rowParameter][colParameter];

    if (
      currentCell.state === CellState.flagged ||
      currentCell.state === CellState.visible
    ) {
      return;
    }

    if (currentCell.value === CellValue.mine) {
      setLost(true);
      const newCells = showMines();
      newCells[rowParameter][colParameter].red = true;
      setCells(newCells);
      return;
    } else if (currentCell.value === CellValue.none) {
      cellsCopy = openCells(cellsCopy, rowParameter, colParameter);
    } else {
      cellsCopy[rowParameter][colParameter].state = CellState.visible;
      setCells(cellsCopy);
    }

    let hasWon = false;
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        const currentCell = cellsCopy[row][col];

        if (
          currentCell.value !== CellValue.mine &&
          currentCell.state === CellState.default
        ) {
          hasWon = true;
          break;
        }
      }
    }

    if (!hasWon) {
      cellsCopy = cellsCopy.map(row =>
        row.map(cell => {
          if (cell.value === CellValue.mine) {
            return {
              ...cell,
              state: CellState.flagged,
            };
          }

          return cell;
        }),
      );
      setWon(true);
    }

    setCells(cellsCopy);
  };

  const handleCellContext = (rowParameter: number, colParameter: number) => (
    e: React.MouseEvent,
  ) => {
    e.preventDefault();

    const cellsCopy = cells.slice();
    const currentCell = cells[rowParameter][colParameter];

    if (currentCell.state === CellState.visible) {
      return;
    } else if (currentCell.state === CellState.default) {
      cellsCopy[rowParameter][colParameter].state = CellState.flagged;
      setCells(cellsCopy);
      setCounter(counter - 1);
    } else if (currentCell.state === CellState.flagged) {
      cellsCopy[rowParameter][colParameter].state = CellState.default;
      setCells(cellsCopy);
      setCounter(counter + 1);
    }
  };

  const handleFaceClick = () => {
    setIsLive(false);
    setTime(0);
    setCells(generateCells());
    setCounter(10);
    setLost(false);
    setWon(false);
  };

  const renderCells = (): React.ReactNode => {
    return cells.map((row, rowIndex) =>
      row.map((cell, colIndex) => (
        <Button
          onClick={handleClick}
          onContext={handleCellContext}
          key={`${rowIndex}-${colIndex}`}
          state={cell.state}
          red={cell.red}
          value={cell.value}
          row={rowIndex}
          col={colIndex}
        />
      )),
    );
  };

  const showMines = (): Cell[][] => {
    const currentCells = cells.slice();

    return currentCells.map(row =>
      row.map(cell => {
        if (cell.value === CellValue.mine) {
          return {
            ...cell,
            state: CellState.visible,
          };
        }

        return cell;
      }),
    );
  };

  return (
    <Container>
      <Header>
        <NumberDisplay value={counter} />
        <Face onClick={handleFaceClick}>{face}</Face>
        <NumberDisplay value={time} />
      </Header>
      <Body>{renderCells()}</Body>
    </Container>
  );
};

export default MainPage;
