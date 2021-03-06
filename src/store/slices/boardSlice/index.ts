import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {IBoard, createBoard, roles} from "../../../models/Board";
import {ICell} from "../../../models/Cell";
import {createShip, IShip, shipSizes} from "../../../models/Ship";
import {IUserData} from "../appSlice/state";
import {
  removeHighlightCell,
  setDraggingShip,
  setHighlightCell,
  setShipToCell,
  setIsDragging,
  changeElementPosition,
  removeItemFromDock,
  rotateElement,
  setUserName,
  setIsHiddenDraggableElement,
  clearBoard,
  setShoot,
  getHit,
} from "./actions";

export type BoardState = {
  userBoard: IBoard;
  partnerBoard: IBoard;
  draggingShip: IShip | null;
  dock: IShip[];
  initDock: {
    port: IShip[];
    id: string;
  }[];
  isDragging: boolean;
  isGameInProgress: boolean;
  isHiddenDraggableElement: boolean;
  turnsHistory: IShoot[];
};

export interface IShoot {
  coords: {
    x: ICell["x"];
    y: ICell["y"];
  };
  userID: IUserData["userID"];
  isShooted: boolean | null;
  destroyedShipData: {coords: IShip["coords"]} | null;
}

const initialState: BoardState = {
  userBoard: createBoard(roles.USER),
  partnerBoard: createBoard(roles.PARTNER),
  draggingShip: null,
  isDragging: false,
  dock: [],
  isGameInProgress: false,
  isHiddenDraggableElement: false,
  turnsHistory: [],
  initDock: [
    {
      id: nanoid(),

      port: [
        createShip(shipSizes.SMALL, null),
        createShip(shipSizes.SMALL, null),
        createShip(shipSizes.SMALL, null),
        createShip(shipSizes.SMALL, null),
      ],
    },
    {
      id: nanoid(),
      port: [
        createShip(shipSizes.MIDDLE, null),
        createShip(shipSizes.MIDDLE, null),
        createShip(shipSizes.MIDDLE, null),
      ],
    },
    {
      id: nanoid(),
      port: [createShip(shipSizes.BIG, null), createShip(shipSizes.BIG, null)],
    },
    {
      id: nanoid(),
      port: [createShip(shipSizes.VERY_BIG, null)],
    },
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
    rotateElement,
    setUserName,
    setIsHiddenDraggableElement,
    clearBoard,
    setShoot,
    getHit,
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
