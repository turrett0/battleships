import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {ICell} from "../../models/Cell";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import {BoardState} from "./boardSlice";

export const setDraggingShip: CaseReducer<
  BoardState,
  PayloadAction<IShip | null>
> = (state, action) => {
  state.draggingShip = action.payload;
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

//Добавлять в ячейки технически по кораблю с 1 жизнью,
// а в отдельный объект записывать настоящие корабли,
//определять их по общему ИД
