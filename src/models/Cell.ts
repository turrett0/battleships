import {nanoid} from "nanoid";
import {Ship} from "./Ship";

export class Cell {
  readonly x: number;
  readonly y: number;
  id: string;
  checked: boolean;
  ship: Ship | null;
  highlighted: boolean;
  isShooted: boolean;

  constructor(x: number, y: number, ship: Ship | null) {
    this.x = x;
    this.y = y;
    this.id = nanoid();
    this.checked = false;
    this.ship = ship;
    this.highlighted = false;
    this.isShooted = false;
  }
  addShip(ship: Ship) {
    this.ship = ship;
  }
}
