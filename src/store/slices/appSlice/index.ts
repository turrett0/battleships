import {createSlice} from "@reduxjs/toolkit";
import {setConnectionStatus, setGameStatus, setUserTurn} from "./actions";

export type AppState = {
  connectionStatus: connectionStatuses;
  gameStatus: gameStatuses;
  isUserTurn: boolean;
};

export enum connectionStatuses {
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
  ERROR = "ERROR",
  DISCONNECTED = "DISCINNECTED",
}

export enum gameStatuses {
  FINDING = "FINGING",
  PLAYING = "PLAYING",
  INIT = "INIT",
  SEARCHING = "SEARCHING",
}

const initialState: AppState = {
  connectionStatus: connectionStatuses.CONNECTING,
  gameStatus: gameStatuses.INIT,
  isUserTurn: true,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGameStatus,
    setConnectionStatus,
    setUserTurn,
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
