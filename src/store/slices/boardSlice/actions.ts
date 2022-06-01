import {CaseReducer, PayloadAction, current} from "@reduxjs/toolkit";
import {ICell} from "../../../models/Cell";
import {createShip, IShip, shipSizes} from "../../../models/Ship";
import {BoardState, IShoot} from ".";
import {getValidCoords, isCanPlace} from "./helpers";
import {AppState} from "../appSlice";

export const setDraggingShip: CaseReducer<
  BoardState,
  PayloadAction<IShip | null>
> = (state, action): void => {
  state.draggingShip = action.payload;
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
        if (element.ship) {
          element.highlighted = true;
          element.ship = null;
        }
      }
      for (let y = startY; y <= endY; y++) {
        const element = state.userBoard.cells[y][startX];
        if (element.ship) {
          element.highlighted = true;
          element.ship = null;
        }
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
  const currentShip: IShip = state.dock.find(
    (ship) => ship.id === action.payload.ship?.id
  ) as IShip;

  const {currentAxis, secondAxisStart, secondAxisEnd} = getValidCoords(
    action.payload,
    currentShip
  );
  const x = currentShip.coords?.startX as number;
  const y = currentShip.coords?.startY as number;
  const currentAxisStart = currentAxis ? x : y;
  const currentAxisEnd = currentAxis
    ? x + currentShip.health - 1
    : y + currentShip.health - 1;

  let yAxis = y + currentShip.health > 9 ? 9 : y + currentShip.health - 1;
  let xAxis = x + currentShip.health > 9 ? 9 : x + currentShip.health;
  let coords: IShip["coords"] = {
    startX: x,
    endX: !currentAxis ? xAxis : x,
    startY: y,
    endY: !currentAxis ? y : yAxis,
  };

  console.log(coords);

  if (y + currentShip.health > 10 || x + currentShip.health > 10) {
    // console.log("three");
    return;
  }
  for (let index = y; index <= yAxis; index++) {
    if (
      (state.userBoard.cells[index][x].ship ||
        state.userBoard.cells[index][x + 1 > 9 ? 9 : x + 1].ship ||
        state.userBoard.cells[index][x - 1 < 0 ? 0 : x - 1].ship) &&
      state.userBoard.cells[index][x].ship?.id !== currentShip.id
    ) {
      // console.log("one");
      return;
    }
  }
  for (let index = x; index <= xAxis; index++) {
    if (
      (state.userBoard.cells[y][index].ship ||
        state.userBoard.cells[y + 1 > 9 ? 9 : y + 1][index].ship ||
        state.userBoard.cells[y - 1 < 0 ? 0 : y - 1][index].ship) &&
      state.userBoard.cells[y][index].ship?.id !== currentShip.id
    ) {
      // console.log("two");
      return;
    }
  }

  for (let j = currentAxisStart; j <= currentAxisEnd; j++) {
    let element = currentAxis
      ? state.userBoard.cells[y][j]
      : state.userBoard.cells[j][x];
    element.ship = null;
  }
  for (let i = secondAxisStart; i <= secondAxisEnd; i++) {
    let element2 = !currentAxis
      ? state.userBoard.cells[y][i]
      : state.userBoard.cells[i][x];
    element2.ship = {
      ...createShip(shipSizes.SMALL, coords, currentShip.id),
    };
  }
  state.dock = state.dock.map((ship) =>
    ship.id === currentShip.id ? {...currentShip, coords} : ship
  );
};

export const setIsHiddenDraggableElement: CaseReducer<
  BoardState,
  PayloadAction<boolean>
> = (state, action) => {
  state.isHiddenDraggableElement = action.payload;
};

export const clearBoard: CaseReducer<BoardState> = (state) => {
  state.dock = [];
  for (let y = 0; y < 10; y++) {
    for (let x = 0; x < 10; x++) {
      const cell = state.userBoard.cells[y][x];
      const partnerCell = state.partnerBoard.cells[y][x];
      cell.ship = null;
      cell.isMissed = false;
      cell.isShooted = false;
      cell.checked = false;
      cell.isCompletelyDestroyed = false;

      partnerCell.isMissed = false;
      partnerCell.isShooted = false;
      partnerCell.checked = false;
      partnerCell.isCompletelyDestroyed = false;
    }
  }
};

export const getHit: CaseReducer<BoardState, PayloadAction<IShoot>> = (
  state,
  action
) => {
  console.log("PAYLOAD:", action.payload);
  const coords = action.payload.coords;
  const targetCell = state.userBoard.cells[coords.y][coords.x];
  const shootedShip = state.dock.find(
    (ship) => ship.id === targetCell.ship?.id
  );
  if (action.payload.isShooted && shootedShip && shootedShip.coords) {
    targetCell.isShooted = true;
    shootedShip.health = shootedShip.health - 1;

    if (shootedShip.health === 0) {
      for (
        let index = shootedShip.coords?.startX;
        index <= shootedShip.coords?.endX;
        index++
      ) {
        console.log(index, shootedShip.coords.startX, shootedShip.coords.endX);

        const element = state.userBoard.cells[shootedShip.coords.startY][index];
        element.isCompletelyDestroyed = true;
      }
      for (
        let index = shootedShip.coords?.startY;
        index <= shootedShip.coords?.endY;
        index++
      ) {
        console.log(index, shootedShip.coords.startY, shootedShip.coords.endY);

        const element = state.userBoard.cells[index][shootedShip.coords.startX];
        element.isCompletelyDestroyed = true;
      }
    }
  } else {
    targetCell.isMissed = true;
  }
  state.turnsHistory.push(action.payload);
  targetCell.checked = true;
};

export const setShoot: CaseReducer<BoardState, PayloadAction<IShoot>> = (
  state,
  action
) => {
  const coords = action.payload.coords;

  console.log("SET SHOOT:", action.payload);

  action.payload.isShooted
    ? (state.partnerBoard.cells[coords.y][coords.x].isShooted = true)
    : (state.partnerBoard.cells[coords.y][coords.x].isMissed = true);

  state.partnerBoard.cells[coords.y][coords.x].checked = true;
  state.turnsHistory.push(action.payload);
  console.log(action.payload);
  if (action.payload.destroyedShipData?.coords) {
    for (
      let index = action.payload.destroyedShipData.coords.startX;
      index <= action.payload.destroyedShipData.coords.endX;
      index++
    ) {
      console.log(index);
      const element =
        state.partnerBoard.cells[
          action.payload.destroyedShipData.coords.startY
        ][index];
      element.isCompletelyDestroyed = true;
    }
    for (
      let index = action.payload.destroyedShipData.coords.startY;
      index <= action.payload.destroyedShipData.coords.endY;
      index++
    ) {
      console.log(index);
      const element =
        state.partnerBoard.cells[index][
          action.payload.destroyedShipData.coords.startX
        ];
      element.isCompletelyDestroyed = true;
    }
  }
};
