import {FC, useEffect, useState} from "react";
import BoardComponent from "./components/BoardComponent/BoardComponent";
import {Board} from "./models/Board";
import styles from "./styles/GlobalStyles.module.scss";

const App: FC = () => {
  const [board, setBoard] = useState<Board>(new Board());

  function restart() {
    const newBoard = new Board();
    newBoard.initCells();
    setBoard(newBoard);
  }

  useEffect(() => {
    restart();
  }, []);

  return (
    <div className={styles.app}>
      <div className={styles.container}>
        <BoardComponent board={board} />
      </div>
    </div>
  );
};

export default App;
