import {configureStore} from "@reduxjs/toolkit";
import boardReducer, {boardActions} from "./slices/boardSlice";
import appReducer, {appActions} from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    board: boardReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const storeActions = {
  ...boardActions,
  ...appActions,
};
