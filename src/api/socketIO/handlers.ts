import {IUserData} from "../../store/slices/appSlice/state";
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

  console.log("d.id===usid", data.userID === userID);
  if (data.userID === userID) {
    console.log("===");
    store.dispatch({type: "board/setShoot", payload: data});
  } else {
    console.log("!==");
    store.dispatch({type: "board/getHit", payload: data});
  }
};
