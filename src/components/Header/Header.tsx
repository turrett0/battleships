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
    <div className={styles.header}>
      <span> {messages[connectionStatus]}</span>
      <span>{gameStatus}</span>
    </div>
  );
};

export default Header;
