import {createSlice} from "@reduxjs/toolkit";
import {IBoard, createBoard, roles} from "../../models/Board";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import {
  removeHighlightCell,
  setDraggingShip,
  setHighlightCell,
  setShipToCell,
  setIsDragging,
  moveBoardElement,
  removeItemFromDock,
  clearDock,
  rotateElement,
  setUserName,
  setMouseOverGrid,
} from "./sliceActions";

export type BoardState = {
  userBoard: IBoard;
  partnerBoard: IBoard | null;
  draggingShip: IShip | null;
  dock: IShip[];
  initDock: IShip[][];
  isCanDrag: boolean;
  isDragging: boolean;
  isGameInProgress: boolean;
  isHiddenDraggableElement: boolean;
};

const initialState: BoardState = {
  userBoard: createBoard(roles.USER),
  partnerBoard: null,
  draggingShip: null,
  isDragging: false,
  dock: [],
  isCanDrag: true,
  isGameInProgress: false,
  isHiddenDraggableElement: false,
  initDock: [
    [
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
    ],
    [
      createShip(shipSizes.MIDDLE, null),
      createShip(shipSizes.MIDDLE, null),
      createShip(shipSizes.MIDDLE, null),
    ],
    [createShip(shipSizes.BIG, null), createShip(shipSizes.BIG, null)],
    [createShip(shipSizes.VERY_BIG, null)],
  ],
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setDraggingShip,
    setShipToCell,
    setHighlightCell,
    removeHighlightCell,
    setIsDragging,
    moveBoardElement,
    removeItemFromDock,
    clearDock,
    rotateElement,
    setUserName,
    setMouseOverGrid,
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
