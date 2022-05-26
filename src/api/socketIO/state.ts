import {ICell} from "../../models/Cell";
import {IUserData} from "../../store/slices/appSlice/state";

export enum gameSocketEvents {
  ON_REGISTRATION = "REGISTRATION",
  ON_SET_GAME = "SET_GAME",
  ON_AWAIT_GAME = "AWAIT_GAME",
  ON_END_GAME = "END_GAME",
  PING = "PING",
  ON_NEW_SHOOT = "NEW_SHOOT",
}

export enum gameSocketAction {
  REQUEST_SHOOT = "SHOOT_REQUEST",
  REQUEST_NEW_GAME = "REQUEST_NEW_GAME",
  REQUEST_END_GAME = "REQUEST_END_GAME",
  REQUEST_PING = "REQUEST_PING",
}

// export interface serverRegistrationData {
//   username: string;
//   userID: string;
//   socketID: string;
//   status: gameStatuses;
// }

export interface turnData {
  coords: {
    x: ICell["x"];
    y: ICell["y"];
  };
  author: IUserData["userID"];
  isShooted: boolean;
}
