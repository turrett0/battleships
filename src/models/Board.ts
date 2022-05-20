import {Cell} from "./Cell";
import {Ship} from "./Ship";

export enum roles {
  USER = "USER",
  PARTNER = "PARTNER",
}

export class Board {
  cells: Cell[][] = [];
  role: roles;
  username: string;
  isControlable: boolean;

  constructor(username: string, role: roles, isControlable: boolean) {
    this.role = role;
    this.isControlable = isControlable;
    this.username = username;
  }

  public initCells() {
    for (let x = 0; x < 10; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < 10; y++) {
        row.push(new Cell(x, y, null));
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(username: string, role: roles, isControlable: boolean) {
    const newBoard = new Board(username, role, isControlable);
    newBoard.cells = this.cells;
    return newBoard;
  }
  public higilightCell(target: Cell) {
    target.checked = true;
  }

  public findHighlightCells(target: Cell, ship: Ship) {
    console.log(target);

    const xCoord = target.x;
    const yCoord = target.y;
    const fromCell = yCoord - ship.health - 1;
    for (let y = fromCell; y < yCoord; y++) {
      this.cells[xCoord][y].highlighted = true;
    }
  }
}
