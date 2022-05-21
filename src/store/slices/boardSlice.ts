import {createSlice} from "@reduxjs/toolkit";
import {IBoard, createBoard, roles} from "../../models/Board";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import {
  removeHighlightCell,
  setDraggingShip,
  setHighlightCell,
  setShipToCell,
  setIsDragging,
  changeElementPosition,
  removeItemFromDock,
  // clearDock,
  rotateElement,
  setUserName,
  setIsHiddenDraggableElement,
} from "./sliceActions";

export type BoardState = {
  userBoard: IBoard;
  partnerBoard: IBoard | null;
  draggingShip: IShip | null;
  dock: IShip[];
  initDock: IShip[][];
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
    changeElementPosition,
    removeItemFromDock,
    // clearDock,
    rotateElement,
    setUserName,
    setIsHiddenDraggableElement,
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
