export enum CellValue {
  none,
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  mine,
}

export enum CellState {
  default,
  visible,
  flagged,
}

export type Cell = { value: CellValue; state: CellState; red?: boolean };
