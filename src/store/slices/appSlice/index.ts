import {createSlice} from "@reduxjs/toolkit";
import {localStorageWrapper} from "../../../api/storageAPI";
import {localStorageDataTypes} from "../../../api/storageAPI/localStorage";
import {
  setConnectionStatus,
  setGameData,
  setUserData,
  setUserTurn,
  setSessionID,
  setIsPrivateGame,
} from "./actions";
import {connectionStatuses, gameStatuses, IUserData} from "./state";

export type AppState = {
  connectionStatus: connectionStatuses;
  gameData: {
    status: gameStatuses;
    sessionID: string | null;
    partnerID: string | null;
    isUserTurn: boolean;
    isPrivateGame: boolean;
  };

  userData: IUserData | undefined;
};
const initialState: AppState = {
  connectionStatus: connectionStatuses.CONNECTING,
  gameData: {
    isPrivateGame: false,
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
    setIsPrivateGame,
  },
});

export const appActions = appSlice.actions;
export default appSlice.reducer;
