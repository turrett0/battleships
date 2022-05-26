import {gameSocket} from ".";
import {store} from "../../store";
import {IShoot} from "../../store/slices/boardSlice";
import {gameSocketAction} from "./state";

export const requireServerRegistration = (data: string): void => {};

export const requireServerNewGame = () => {
  const coordsWithShips = store.getState().board.dock;
  gameSocket.emit(gameSocketAction.REQUEST_NEW_GAME, coordsWithShips);
};

export const requireServerShoot = (data: IShoot) => {
  gameSocket.emit(gameSocketAction.REQUEST_SHOOT, data);
};
