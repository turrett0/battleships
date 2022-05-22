import {CaseReducer, PayloadAction, current} from "@reduxjs/toolkit";
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
    let tmpX = state.draggingShip?.coords?.endX;
    let tmpY = state.draggingShip?.coords?.endY;
    let x = action.payload.x;
    let y = action.payload.y;
    let endX =
      x +
      (tmpX
        ? tmpX - state.draggingShip.health - 1
        : state.draggingShip.health - 1);
    let endY =
      tmpY === undefined || tmpY === y ? y : y + state.draggingShip.health - 1;
    if (endX > 9) {
      endX = 9;
      x = x - 1;
    }
    console.log(y, endY);
    const isCanPlaceTo = isCanPlace(state.userBoard, x, y, state.draggingShip);

    for (let i = x; i <= endX; i++) {
      const element = state.userBoard.cells[y][i];
      if (isCanPlaceTo) {
        element.highlighted = true;
      } else {
        element.isCanNotPlace = true;
      }
    }
    console.log("START Y:", y, "END Y:", endY);
    console.log("START X:", x, "END X:", endX);

    for (let i = y; i <= endY; i++) {
      const element = state.userBoard.cells[i][x];
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
    let endY = state.draggingShip.coords?.endY || y;

    if (x + state.draggingShip.health - 1 > 9) {
      endX = 9;
      x = x - 1;
    }
    for (let i = x; i <= endX; i++) {
      const element = state.userBoard.cells[y][i];
      element.highlighted = false;
      element.isCanNotPlace = false;
    }

    for (let i = y; i <= endY; i++) {
      const element = state.userBoard.cells[i][x];
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
    let startY = action.payload.coords?.startY;
    let endY = action.payload.coords?.endY;
    let y = action.payload.coords?.startY;
    if (
      startX !== undefined &&
      endX !== undefined &&
      y !== undefined &&
      startY !== undefined &&
      endY !== undefined
    ) {
      for (let i = startX; i <= endX; i++) {
        const element = state.userBoard.cells[y][i];
        element.highlighted = true;
        element.ship = null;
      }
      for (let y = startY; y <= endY; y++) {
        const element = state.userBoard.cells[y][startX];

        element.highlighted = true;
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
) => {
  const currentShip: IShip = state.initDock.reduce((acc, port) => {
    let curr = port.find((ship) => ship.id === action.payload?.ship?.id);
    if (curr) {
      acc = {...curr, coords: action.payload.ship?.coords || null};
      return acc;
    }
    return acc;
  }, {} as IShip);
  const coords = currentShip.coords;
  const health = currentShip.health;
  if (coords && health && coords.startY + health - 1 <= 9) {
    const newYCoords = {
      startX: coords.startX,
      endX: coords.startX,
      startY: coords.startY,
      endY: coords.startY + health - 1,
    };
    const newXCoords = {
      startX: coords.startX,
      endX: coords.startX + health - 1,
      startY: coords.startY,
      endY: coords.startY,
    };

    let newShipElement: IShip = {} as IShip;

    const isVertical = coords.startX !== coords.endX;

    for (let x = coords.startX; x < coords.startX + health; x++) {
      let element = state.userBoard.cells[coords.startY][x];
      if (isVertical) {
        element.ship = null;
      } else {
        newShipElement = {
          ...currentShip,
          coords: newXCoords,
        };
        element.ship = {
          ...createShip(shipSizes.SMALL, newXCoords, currentShip.id),
        };
      }
    }
    for (let y = coords.startY; y < coords.startY + health; y++) {
      const element = state.userBoard.cells[y][coords.startX];
      if (isVertical) {
        newShipElement = {
          ...currentShip,
          coords: newYCoords,
        };
        element.ship = {
          ...createShip(shipSizes.SMALL, newYCoords, currentShip.id),
        };
      } else {
        if (y !== coords.startY) {
          element.ship = null;
        }
      }
    }
    state.dock = state.dock.map((ship) =>
      ship.id === currentShip.id ? newShipElement : ship
    );
  }
};

export const setIsHiddenDraggableElement: CaseReducer<
  BoardState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isHiddenDraggableElement = action.payload;
};
