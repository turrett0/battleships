import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {IBoard} from "../../models/Board";
import {ICell} from "../../models/Cell";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import {BoardState} from "./boardSlice";

export const setDraggingShip: CaseReducer<
  BoardState,
  PayloadAction<IShip | null>
> = (state, action): void => {
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
      x + ship.health - 1 > 9 ||
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
): void => {
  if (state.draggingShip) {
    let x = action.payload.x;
    let y = action.payload.y;
    let endX = x + state.draggingShip.health - 1;

    if (x + state.draggingShip.health - 1 > 9) {
      endX = 9;
      x = x - 1;
    }

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
      state.isDragging = false;
      state.isHiddenDraggableElement = false;
      for (let i = x; i < x + state.draggingShip.health; i++) {
        state.userBoard.cells[y][i].highlighted = false;
      }
    }
  }
};

export const setHighlightCell: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
): void => {
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
      if (isCanPlace(state.userBoard, x, y, state.draggingShip)) {
        element.highlighted = true;
      } else {
        element.isCanNotPlace = true;
      }
    }
  }
};

export const removeHighlightCell: CaseReducer<
  BoardState,
  PayloadAction<ICell>
> = (state, action): void => {
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
      element.isCanNotPlace = false;
    }
  }
};

export const setIsDragging: CaseReducer<BoardState, PayloadAction<boolean>> = (
  state,
  action
): void => {
  state.isDragging = action.payload;
};

export const changeElementPosition: CaseReducer<
  BoardState,
  PayloadAction<IShip>
> = (state, action): void => {
  state.isHiddenDraggableElement = true;
  const currentShip = state.dock.find((ship) => ship.id === action.payload.id);
  if (currentShip) {
    state.draggingShip = currentShip;
    let startX = action.payload.coords?.startX;
    let endX = action.payload.coords?.endX;
    let y = action.payload.coords?.startY;
    if (startX !== undefined && endX !== undefined && y !== undefined) {
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

export const setUserName: CaseReducer<BoardState, PayloadAction<string>> = (
  state,
  action
): void => {
  state.userBoard.username = action.payload;
};

export const rotateElement: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
) => {};

export const setIsHiddenDraggableElement: CaseReducer<
  BoardState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isHiddenDraggableElement = action.payload;
};
