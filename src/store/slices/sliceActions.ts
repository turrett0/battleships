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
      y + ship.health - 1 > 9 ||
      x + ship.health - 1 > 9 ||
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
  // console.log(true);
  return true;
};

export const setShipToCell: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
): void => {
  if (state.draggingShip) {
    const {x, y, endX, endY} = getValidCoords(
      action.payload,
      state.draggingShip
    );

    if (!isCanPlace(state.userBoard, x, y, state.draggingShip)) return;

    const newYCoords = {
      startX: x,
      endX: x,
      startY: y,
      endY,
    };
    const newXCoords = {
      startX: x,
      endX: endX,
      startY: y,
      endY: y,
    };

    if (
      !state.draggingShip.coords ||
      state.draggingShip.coords?.startX !== state.draggingShip.coords?.endX
    ) {
      for (let i = x; i <= endX; i++) {
        const element = state.userBoard.cells[y][i];

        element.ship = {
          ...createShip(shipSizes.SMALL, newXCoords, state.draggingShip.id),
        };
        element.highlighted = false;
      }

      state.dock.push({
        ...createShip(
          state.draggingShip.size,
          newXCoords,
          state.draggingShip.id
        ),
      });
    } else {
      for (let i = y; i <= endY; i++) {
        const element = state.userBoard.cells[i][x];
        element.ship = {
          ...createShip(shipSizes.SMALL, newYCoords, state.draggingShip.id),
        };
        element.highlighted = false;
      }

      state.dock.push({
        ...createShip(
          state.draggingShip.size,
          newYCoords,
          state.draggingShip.id
        ),
      });
    }

    state.isDragging = false;
    state.isHiddenDraggableElement = false;
  }
};

export const setHighlightCell: CaseReducer<BoardState, PayloadAction<ICell>> = (
  state,
  action
): void => {
  if (state.draggingShip) {
    const {currentAxisStart, currentAxisEnd, currentAxis, x, y} =
      getValidCoords(action.payload, state.draggingShip);
    for (let j = currentAxisStart; j <= currentAxisEnd; j++) {
      let element = currentAxis
        ? state.userBoard.cells[y][j]
        : state.userBoard.cells[j][x];

      isCanPlace(state.userBoard, x, y, state.draggingShip)
        ? (element.highlighted = true)
        : (element.isCanNotPlace = true);
    }
  }
};

export const removeHighlightCell: CaseReducer<
  BoardState,
  PayloadAction<ICell>
> = (state, action): void => {
  if (state.draggingShip) {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        state.userBoard.cells[i][j].highlighted = false;
        state.userBoard.cells[i][j].isCanNotPlace = false;
      }
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
  const currentShip = state.dock.find((ship) => ship.id === action.payload.id);
  if (currentShip) {
    state.draggingShip = {...currentShip, coords: action.payload.coords};
    let startX = action.payload.coords?.startX;
    let endX = action.payload.coords?.endX;
    let startY = action.payload.coords?.startY;
    let endY = action.payload.coords?.endY;
    if (
      startX !== undefined &&
      endX !== undefined &&
      startY !== undefined &&
      endY !== undefined
    ) {
      for (let x = startX; x <= endX; x++) {
        const element = state.userBoard.cells[startY][x];
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
  if (
    coords &&
    health &&
    isCanPlace(state.userBoard, action.payload.x, action.payload.y, currentShip)
  ) {
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

const getValidCoords = (cell: ICell, draggingElement: IShip) => {
  let x = cell.x ?? (draggingElement.coords?.startX as number);
  let y = cell.y ?? (draggingElement.coords?.startY as number);
  let endX = x + draggingElement.health - 1;
  let endY = y + draggingElement.health - 1;
  if (endY > 9) {
    endY = 9;
  }

  if (endX > 9) {
    endX = 9;
  }

  const currentAxis =
    !draggingElement.coords ||
    draggingElement.coords?.startX !== draggingElement.coords?.endX;
  const currentAxisStart = currentAxis ? x : y;
  const currentAxisEnd = currentAxis ? endX : endY;

  return {
    currentAxis,
    currentAxisStart,
    currentAxisEnd,
    x,
    y,
    endX,
    endY,
  };
};
