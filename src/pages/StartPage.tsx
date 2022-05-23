import React from "react";
import PartnerBoardComponent from "../components/Boards/PartnerBoard/PartnerBoardComponent";
import UserBoardComponent from "../components/Boards/UserBoard/UserBoardComponent";
import Dock from "../components/Dock/Dock";
import styles from "../styles/GlobalStyles.module.scss";

const StartPage = () => {
  return (
    <>
      <div className={styles.container}>
        <Dock />
        <UserBoardComponent />
        <PartnerBoardComponent />
      </div>
    </>
  );
};

export default StartPage;
