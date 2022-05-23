import {io} from "socket.io-client";
import {serverRegistrationHandler, serverSetNewGameHandler} from "./handlers";
import {gameSocketEvents} from "./state";

export const gameSocket = io("ws://192.168.3.7:6969");

gameSocket.on(gameSocketEvents.ON_REGISTRATION, (data) =>
  serverRegistrationHandler(data)
);

gameSocket.on(gameSocketEvents.ON_SET_GAME, (data) =>
  serverSetNewGameHandler(data)
);

gameSocket.on(gameSocketEvents.PING, (data) => {
  console.log(data);
});
