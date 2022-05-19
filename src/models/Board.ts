import {Cell} from "./Cell";

export class Board {
  cells: Cell[][] = [];

  public initCells() {
    for (let x = 0; x < 10; x++) {
      const row: Cell[] = [];
      for (let y = 0; y < 10; y++) {
        row.push(new Cell(x, y));
      }
      this.cells.push(row);
    }
  }
}
