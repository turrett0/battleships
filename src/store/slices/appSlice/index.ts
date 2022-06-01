import {createSlice} from "@reduxjs/toolkit";
import {localStorageWrapper} from "../../../api/storageAPI";
import {localStorageDataTypes} from "../../../api/storageAPI/localStorage";
import {
  setConnectionStatus,
  setGameData,
  setUserData,
  setUserTurn,
  setSessionID,
} from "./actions";
import {connectionStatuses, gameStatuses, IUserData} from "./state";

export type AppState = {
  connectionStatus: connectionStatuses;
  gameData: {
    status: gameStatuses;
    sessionID: string | null;
    partnerID: string | null;
    isUserTurn: boolean;
  };

  userData: IUserData | undefined;
};
const initialState: AppState = {
  connectionStatus: connectionStatuses.CONNECTING,
  gameData: {
    status: gameStatuses.INIT,
    sessionID: null,
    partnerID: null,
    isUserTurn: true,
  },

  userData: localStorageWrapper.getItem(localStorageDataTypes.USER_DATA),
};

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setGameData,
    setConnectionStatus,
    setUserTurn,
    setUserData,
    setSessionID,
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
