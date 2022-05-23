import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from ".";

export const setGameStatus: CaseReducer<
  AppState,
  PayloadAction<AppState["gameStatus"]>
> = (state, action) => {
  state.gameStatus = action.payload;
};
export const setConnectionStatus: CaseReducer<
  AppState,
  PayloadAction<AppState["connectionStatus"]>
> = (state, action) => {
  state.connectionStatus = action.payload;
};
export const setUserTurn: CaseReducer<
  AppState,
  PayloadAction<AppState["isUserTurn"]>
> = (state, action) => {
  state.isUserTurn = action.payload;
};
