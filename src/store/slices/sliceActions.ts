import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {IBoard} from "../../models/Board";
import {ICell} from "../../models/Cell";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import {BoardState} from "./boardSlice";

export const setDraggingShip: CaseReducer<
  BoardState,
  PayloadAction<IShip | null>
> = (state, action) => {
  state.draggingShip = action.payload;
};

const isCanPlace = (
  board: IBoard,
  x: number,
  y: number,
  ship: IShip
): boolean => {
  let lastIndex = x + ship.health;
  for (let index = x; index <= lastIndex; index++) {
    if (lastIndex + ship.health > 9) {
      lastIndex = 9;
    }

    if (
      board.cells[y + 1 > 9 ? 9 : y + 1][index]?.ship ||
      board.cells[y - 1 < 0 ? 0 : y - 1][index]?.ship ||
      board.cells[y + 1 > 9 ? 9 : y + 1][index + 1]?.ship ||
      board.cells[y + 1 > 9 ? 9 : y + 1][index - 1]?.ship ||
      board.cells[y - 1 < 0 ? 0 : y - 1][index - 1]?.ship ||
      board.cells[y][index]?.ship ||
      board.cells[y][index - 1]?.ship
    ) {
      return false;
    }
  }
  return true;
};

export const setShipToCell: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
) => {
  if (state.draggingShip) {
    let x = action.payload.x;
    let y = action.payload.y;
    let endX = x + state.draggingShip.health - 1;

    if (x + state.draggingShip.health - 1 > 9) {
      endX = 9;
      x = x - 1;
    }

    // console.log(x, endX);
    if (isCanPlace(state.userBoard, x, y, state.draggingShip)) {
      for (let i = x; i <= endX; i++) {
        const element = state.userBoard.cells[y][i];

        element.ship = {
          ...createShip(
            shipSizes.SMALL,
            {
              startX: x,
              endX: x + state.draggingShip.health - 1,
              startY: y,
              endY: y,
            },
            state.draggingShip.id
          ),
        };
      }
      state.dock.push({
        ...createShip(
          state.draggingShip.size,
          {
            startX: x,
            endX: x + state.draggingShip.health - 1,
            startY: y,
            endY: y,
          },
          state.draggingShip.id
        ),
      });
    }
  }
};

export const setHighlightCell: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
) => {
  if (state.draggingShip) {
    let x = action.payload.x;
    let y = action.payload.y;
    let endX = x + state.draggingShip.health - 1;

    if (x + state.draggingShip.health - 1 > 9) {
      endX = 9;
      x = x - 1;
    }
    for (let i = x; i <= endX; i++) {
      const element = state.userBoard.cells[y][i];
      element.highlighted = true;
    }
  }
};
export const removeHighlightCell: CaseReducer<
  BoardState,
  PayloadAction<ICell>
> = (state, action) => {
  if (state.draggingShip) {
    let x = action.payload.x;
    let y = action.payload.y;
    let endX = x + state.draggingShip.health - 1;
    if (x + state.draggingShip.health - 1 > 9) {
      endX = 9;
      x = x - 1;
    }
    for (let i = 0; i <= endX; i++) {
      const element = state.userBoard.cells[y][i];
      element.highlighted = false;
    }
  }
};

export const setIsDragging: CaseReducer<BoardState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.isDragging = action.payload;
};

export const moveBoardElement: CaseReducer<BoardState, PayloadAction<IShip>> = (
  state,
  action
) => {
  const currentShip = state.dock.find((ship) => ship.id === action.payload.id);
  if (currentShip) {
    state.draggingShip = currentShip;
    let startX = action.payload.coords?.startX;
    let endX = action.payload.coords?.endX;
    let y = action.payload.coords?.startY;

    if (startX && endX && y) {
      for (let i = startX; i <= endX; i++) {
        const element = state.userBoard.cells[y][i];
        element.ship = null;
      }
    }
    state.dock = state.dock.filter((ship) => ship.id !== action.payload.id);
  }
};

export const removeItemFromDock: CaseReducer<
  BoardState,
  PayloadAction<IShip>
> = (state, action) => {
  state.dock.filter((ship) => ship.id !== action.payload.id);
};

export const returnShip: CaseReducer<BoardState, PayloadAction<IShip>> = (
  state,
  action
) => {};
