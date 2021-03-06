import {CaseReducer, PayloadAction} from "@reduxjs/toolkit";
import {AppState} from ".";

export const setGameData: CaseReducer<
  AppState,
  PayloadAction<AppState["gameData"]>
> = (state, action) => {
  state.gameData = action.payload;
};
export const setConnectionStatus: CaseReducer<
  AppState,
  PayloadAction<AppState["connectionStatus"]>
> = (state, action) => {
  state.connectionStatus = action.payload;
};
export const setUserTurn: CaseReducer<AppState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.gameData.isUserTurn = action.payload;
};

export const setUserData: CaseReducer<
  AppState,
  PayloadAction<AppState["userData"]>
> = (state, action) => {
  state.userData = action.payload;
};

export const setPrivateSession: CaseReducer<AppState, PayloadAction<string>> = (
  state,
  action
) => {
  state.gameData.sessionID = action.payload;
  state.gameData.isPrivateGame = true;
};

export const setIsPrivateGame: CaseReducer<AppState, PayloadAction<boolean>> = (
  state,
  action
) => {
  state.gameData.isPrivateGame = action.payload;
};
