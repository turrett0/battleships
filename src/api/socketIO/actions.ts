import {gameSocket} from ".";
import {gameSocketAction, serverRegistrationData} from "./state";

export const requireServerRegistration = (
  data: serverRegistrationData["username"]
): void => {};

export const requireServerNewGame = (data: any) => {
  gameSocket.emit(gameSocketAction.REQUEST_NEW_GAME);
};

export const requireServerPing = (data: any) => {
  gameSocket.emit(gameSocketAction.REQUEST_PING);
};
