import {createSlice} from "@reduxjs/toolkit";
import {
  setConnectionStatus,
  setGameData,
  setUserData,
  setUserTurn,
} from "./actions";
import {connectionStatuses, gameStatuses, IUserData} from "./state";

export type AppState = {
  connectionStatus: connectionStatuses;
  gameData: {
    status: gameStatuses;
    sessionID: string | null;
    partnerID: string | null;
  };
  isUserTurn: boolean;
  userData: IUserData | null;
};
const initialState: AppState = {
  connectionStatus: connectionStatuses.CONNECTING,
  gameData: {status: gameStatuses.INIT, sessionID: null, partnerID: null},
  isUserTurn: true,
  userData: null,
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGameData,
    setConnectionStatus,
    setUserTurn,
    setUserData,
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
