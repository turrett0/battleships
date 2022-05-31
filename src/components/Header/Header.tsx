import {requireServerBreakGame} from "../../api/socketIO/actions";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import {gameStatuses} from "../../store/slices/appSlice/state";
import styles from "./Header.module.scss";

enum messages {
  CONNECTED = "Подключено",
  CONNECTING = "Подключение...",
  DISCONNECTED = "Отключено",
  ERROR = "Ошибка",
}

const Header = () => {
  const connectionStatus = useAppSelector(({app}) => app.connectionStatus);
  const userID = useAppSelector(({app}) => app.userData?.userID);
  const gameStatus = useAppSelector(({app}) => app.gameData.status);
  return (
    <header className={styles.header}>
      {gameStatus !== gameStatuses.INIT && (
        <button className={styles.endGameBtn} onClick={requireServerBreakGame}>
          Закончить игру
        </button>
      )}
      <div className={styles.statuses}>
        <span>{messages[connectionStatus]}</span>
        <span>gameStatus: {gameStatus}</span>
        <span>userID: {userID}</span>
      </div>
    </header>
  );
};

export default Header;
