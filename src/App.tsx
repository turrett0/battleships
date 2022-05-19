import {FC, useEffect, useState} from "react";
import BoardComponent from "./components/BoardComponent/BoardComponent";
import Dock from "./components/Ship/Dock/Dock";
import {Board, roles} from "./models/Board";
import styles from "./styles/GlobalStyles.module.scss";

const App: FC = () => {
  const [userBoard, setUserBoard] = useState<Board>(
    new Board("Dmitry", roles.USER, false)
  );
  const [partnerBoard, setPartnerBoard] = useState<Board>(
    new Board("Barbek Akzum", roles.PARTNER, true)
  );

  function restart() {
    const newUserBoard = new Board("Dmitry", roles.USER, false);
    const newPartnerBoard = new Board("Barbek Akzum", roles.PARTNER, true);
    newUserBoard.initCells();
    newPartnerBoard.initCells();
    setUserBoard(newUserBoard);
    setPartnerBoard(newPartnerBoard);
  }

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <BoardComponent board={userBoard} setBoard={setUserBoard} />
        <BoardComponent board={partnerBoard} setBoard={setPartnerBoard} />
      </div>
      <Dock />
    </div>
  );
};

export default App;
