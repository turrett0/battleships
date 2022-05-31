import {nanoid} from "nanoid";
import {IShip} from "./Ship";

export interface ICell {
  x: number;
  y: number;
  id: string;
  checked: boolean;
  isShooted: boolean;
  isMissed: boolean;
  ship: IShip | null;
  highlighted: boolean;
  isCanNotPlace: boolean;
  isCompletelyDestroyed: boolean;
}

export const createCell = (x: number, y: number): ICell => {
  return {
    x,
    y,
    id: nanoid(),
    checked: false,
    ship: null,
    highlighted: false,
    isShooted: false,
    isMissed: false,
    isCanNotPlace: false,
    isCompletelyDestroyed: false,
  };
};
