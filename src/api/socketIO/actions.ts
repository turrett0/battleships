import {gameSocket} from ".";
import {store} from "../../store";
import {AppState} from "../../store/slices/appSlice";
import {gameStatuses} from "../../store/slices/appSlice/state";
import {IShoot} from "../../store/slices/boardSlice";
import {gameSocketAction} from "./state";

export const requireServerRegistration = (
  data: AppState["userData"] | null
): void => {
  console.log("reg");
  gameSocket.emit(gameSocketAction.REQUEST_REGISTRATION, data);
};

export const requireServerNewGame = () => {
  const coordsWithShips = store.getState().board.dock;
  gameSocket.emit(gameSocketAction.REQUEST_NEW_GAME, coordsWithShips);
};

export const requireServerShoot = (data: IShoot) => {
  gameSocket.emit(gameSocketAction.REQUEST_SHOOT, data);
};

export const requireServerBreakGame = () => {
  gameSocket.emit(gameSocketAction.REQUEST_BREAK_GAME);
  store.dispatch({type: "board/clearBoard"});
  store.dispatch({
    type: "app/setGameData",
    payload: {status: gameStatuses.INIT, sessionID: null, partnerID: null},
  });
};
