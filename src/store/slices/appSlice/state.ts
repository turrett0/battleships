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
  PRIVATE_AWAITING = "PRIVATE_AWAITING",
}

export interface IUserData {
  username: string | null;
  userID: string;
}
