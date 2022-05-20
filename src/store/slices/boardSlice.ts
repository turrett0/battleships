import {createSlice} from "@reduxjs/toolkit";
import {IBoard, createBoard, roles} from "../../models/Board";
import {IShip} from "../../models/Ship";
import {
  removeHighlightCell,
  setDraggingShip,
  setHighlightCell,
  setShipToCell,
} from "./sliceActions";

export type BoardState = {
  userBoard: IBoard;
  partnerBoard: IBoard | null;
  draggingShip: IShip | null;
  test: string;
};

const initialState: BoardState = {
  userBoard: createBoard(roles.USER),
  partnerBoard: null,
  draggingShip: null,
  test: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    setDraggingShip,
    setShipToCell,
    setHighlightCell,
    removeHighlightCell,
  },
});

export const boardActions = boardSlice.actions;

export default boardSlice.reducer;
