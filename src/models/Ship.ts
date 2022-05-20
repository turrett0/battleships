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

export interface IShip {
  size: shipSizes;
  coords: {
    startX: number;
    endX: number;
    startY: number;
    endY: number;
  } | null;
  health: shipHealth;
  id: string;
}

export const createShip = (
  size: shipSizes,
  coords: IShip["coords"],
  id?: string
): IShip => {
  return {
    size,
    coords,
    health: shipHealth[size],
    id: id || nanoid(),
  };
};
