import React from "react";
import PartnerBoardComponent from "../components/Boards/PartnerBoard/PartnerBoardComponent";
import UserBoardComponent from "../components/Boards/UserBoard/UserBoardComponent";
import Dock from "../components/Dock/Dock";
import {useAppSelector} from "../hooks/store/useAppSelector";
import {gameStatuses} from "../store/slices/appSlice/state";
import styles from "../styles/GlobalStyles.module.scss";

const StartPage = () => {
  const isGameInProgress =
    useAppSelector(({app}) => app.gameData.status) !== gameStatuses.INIT;
  return (
    <>
      <div className={styles.container}>
        {!isGameInProgress && <Dock />}
        <UserBoardComponent />
        <PartnerBoardComponent />
      </div>
    </>
  );
};

export default StartPage;
