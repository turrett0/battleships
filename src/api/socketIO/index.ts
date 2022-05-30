import {io} from "socket.io-client";
import {store} from "../../store";
import {connectionStatuses} from "../../store/slices/appSlice/state";
import {IShoot} from "../../store/slices/boardSlice";
import {
  serverBreakGameHandler,
  serverEndGameHandler,
  serverGetNewShootHandler,
  serverRegistrationHandler,
  serverSetNewGameHandler,
} from "./handlers";
import {gameSocketEvents} from "./state";

export const gameSocket = io("ws://192.168.3.7:6969");

gameSocket.on("connect", () => {
  store.dispatch({
    type: "app/setConnectionStatus",
    payload: connectionStatuses.CONNECTED,
  });
});

gameSocket.on("disconnect", () => {
  store.dispatch({
    type: "app/setConnectionStatus",
    payload: connectionStatuses.DISCONNECTED,
  });
});
gameSocket.on("connect_error", () => {
  let currentStatus = store.getState().app.connectionStatus;
  if (currentStatus !== connectionStatuses.ERROR) {
    store.dispatch({
      type: "app/setConnectionStatus",
      payload: connectionStatuses.ERROR,
    });
  }
});

gameSocket.on(gameSocketEvents.ON_REGISTRATION, (data) =>
  serverRegistrationHandler(data)
);

gameSocket.on(gameSocketEvents.ON_SET_GAME, (data) =>
  serverSetNewGameHandler(data)
);

gameSocket.on(gameSocketEvents.ON_AWAIT_GAME, (data) => {
  store.dispatch({type: "app/setGameData", payload: data});
});

gameSocket.on(gameSocketEvents.ON_NEW_SHOOT, (data: IShoot) =>
  serverGetNewShootHandler(data)
);

gameSocket.on(gameSocketEvents.ON_END_GAME, (data) =>
  serverEndGameHandler(data)
);

gameSocket.on(gameSocketEvents.ON_BREAK_GAME, (data) =>
  serverBreakGameHandler(data)
);
