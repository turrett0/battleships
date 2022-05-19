import {Cell} from "./Cell";
import {nanoid} from "nanoid";

export enum shipSizes {
  SMALL = "SMALL",
  MIDDLE = "MIDDLE",
  BIG = "BIG",
  VERY_BIG = "VERY_BIG",
}

export enum shipHealth {
  SMALL = 1,
  MIDDLE = 2,
  BIG = 3,
  VERY_BIG = 4,
}

export class Ship {
  size: shipSizes;
  cell: Cell | null;
  health: shipHealth;
  id: string;

  constructor(size: shipSizes, cell: Cell | null) {
    this.size = size;
    this.cell = cell;
    this.health = shipHealth[size];
    this.id = nanoid();
  }

  renderShip() {}
}
