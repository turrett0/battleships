import {ICell} from "../../models/Cell";
import {AppState} from "../../store/slices/appSlice";
import {gameStatuses, IUserData} from "../../store/slices/appSlice/state";

export enum gameSocketEvents {
  ON_REGISTRATION = "REGISTRATION",
  ON_SET_GAME = "SET_GAME",
  ON_AWAIT_GAME = "AWAIT_GAME",
  ON_END_GAME = "END_GAME",
  PING = "PING",
  ON_NEW_SHOOT = "NEW_SHOOT",
  ON_BREAK_GAME = "BREAK_GAME",
}

export enum gameSocketAction {
  REQUEST_SHOOT = "SHOOT_REQUEST",
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  REQUEST_BREAK_GAME = "REQUEST_BREAK_GAME",
  REQUEST_REGISTRATION = "REQUEST_REGISTRATION",
  REQUEST_FRIEND_GAME = "REQUEST_FRIEND_GAME",
}

export interface turnData {
  coords: {
    x: ICell["x"];
    y: ICell["y"];
  };
  author: IUserData["userID"];
  isShooted: boolean;
}

export interface GameData {
  status: gameStatuses;
  sessionID: string;
  partnerID: string;
  firstTurnID: string;
}
