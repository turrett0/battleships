import {createCell, ICell} from "./Cell";

export enum roles {
  USER = "USER",
  PARTNER = "PARTNER",
}

export interface IBoard {
  cells: ICell[][];
  role: roles;
  username: string;
  isControlable: boolean;
}

const createCells = () => {
  let cells: ICell[][] = [];
  for (let y = 0; y < 10; y++) {
    const row: ICell[] = [];
    for (let x = 0; x < 10; x++) {
      row.push(createCell(x, y));
    }
    cells.push(row);
  }
  return cells;
};

export const createBoard = (role: roles): IBoard => {
  return {
    cells: createCells(),
    role: role,
    username: "",
    isControlable: false,
  };
};
