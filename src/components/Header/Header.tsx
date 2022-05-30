import {useAppSelector} from "../../hooks/store/useAppSelector";
import styles from "./Header.module.scss";

enum messages {
  CONNECTED = "Подключено",
  CONNECTING = "Подключение...",
  DISCONNECTED = "Отключено",
  ERROR = "Ошибка",
}

const Header = () => {
  const connectionStatus = useAppSelector(({app}) => app.connectionStatus);
  const gameStatus = useAppSelector(({app}) => app.gameData.status);
  return (
    <header className={styles.header}>
      <button className={styles.endGameBtn}>Закончить игру</button>
      <div className={styles.statuses}>
        <span>{messages[connectionStatus]}</span>
        <span>gameStatus: {gameStatus}</span>
      </div>
    </header>
  );
};

export default Header;
