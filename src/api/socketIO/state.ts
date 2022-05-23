import {ICell} from "../../models/Cell";
import {gameStatuses} from "../../store/slices/appSlice";

export enum gameSocketEvents {
  ON_REGISTRATION = "REGISTRATION",
  ON_SET_GAME = "SET_GAME",
  ON_END_GAME = "END_GAME",
  PING = "PING",
}

export enum gameSocketAction {
  REQUEST_SHOOT_REQUEST = "SET_SHOOT_REQUEST",
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  REQUEST_END_GAME = "REQUEST_END_GAME",
  REQUEST_PING = "REQUEST_PING",
}

export interface serverRegistrationData {
  username: string;
  userID: string;
  socketID: string;
  status: gameStatuses;
}

export interface turnData {
  coords: {
    x: ICell["x"];
    y: ICell["y"];
  };
  author: serverRegistrationData["userID"];
  isShooted: boolean;
}
