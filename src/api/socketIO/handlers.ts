import {gameStatuses, IUserData} from "../../store/slices/appSlice/state";
import {store} from "../../store";
import {IShoot} from "../../store/slices/boardSlice";
export const serverRegistrationHandler = (data: IUserData) => {
  store.dispatch({type: "app/setUserData", payload: data});
};

export const serverSetNewGameHandler = (data: any) => {
  store.dispatch({type: "app/setGameData", payload: data});
};

export const serverGetNewShootHandler = (data: IShoot) => {
  const userID = store.getState().app.userData?.userID;

  if (data.userID === userID) {
    store.dispatch({type: "board/setShoot", payload: data});
    data.isShooted
      ? store.dispatch({type: "app/setUserTurn", payload: true})
      : store.dispatch({type: "app/setUserTurn", payload: false});
  } else {
    store.dispatch({type: "board/getHit", payload: data});
    data.isShooted
      ? store.dispatch({type: "app/setUserTurn", payload: false})
      : store.dispatch({type: "app/setUserTurn", payload: true});
  }
};

export const serverEndGameHandler = (data: any) => {
  if (data.loseID === store.getState().app.userData?.userID) {
    alert("Вы проиграли.");
  } else {
    alert("Вы выйграли.");
  }
  store.dispatch({type: "board/clearBoard"});
  store.dispatch({
    type: "app/setGameData",
    payload: {status: gameStatuses.INIT, sessionID: null, partnerID: null},
  });
};

export const serverBreakGameHandler = (data: string) => {
  store.dispatch({type: "board/clearBoard"});
  store.dispatch({
    type: "app/setGameData",
    payload: {status: gameStatuses.INIT, sessionID: null, partnerID: null},
  });
};
