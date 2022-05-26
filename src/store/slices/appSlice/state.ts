export enum connectionStatuses {
  CONNECTED = "CONNECTED",
  CONNECTING = "CONNECTING",
  ERROR = "ERROR",
  DISCONNECTED = "DISCONNECTED",
}

export enum gameStatuses {
  FINDING = "FINGING",
  PLAYING = "PLAYING",
  INIT = "INIT",
  AWAITING = "AWAITING",
}

export interface IUserData {
  socketID: string;
  userID: string;
}
