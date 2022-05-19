import {nanoid} from "nanoid";

export class Cell {
  readonly x: number;
  readonly y: number;
  id: string;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.id = nanoid();
  }
}
