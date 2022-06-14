import {requireServerBreakGame} from "../../api/socketIO/actions";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import {
  connectionStatuses,
  gameStatuses,
} from "../../store/slices/appSlice/state";
import styles from "./Header.module.scss";

const Header = () => {
  const connectionStatus = useAppSelector(({app}) => app.connectionStatus);
  const gameStatus = useAppSelector(({app}) => app.gameData.status);
  const isUserTurn = useAppSelector(({app}) => app.gameData.isUserTurn);
  const isConnectionError = connectionStatus === connectionStatuses.ERROR;
  const isPlaying = gameStatus === gameStatuses.PLAYING;
  const isInitState = gameStatus === gameStatuses.INIT;
  const isAwaiting = gameStatus === gameStatuses.AWAITING;
  return (
    <header className={styles.header}>
      {!isInitState && (
        <button className={styles.endGameBtn} onClick={requireServerBreakGame}>
          Закончить игру
        </button>
      )}
      <div className={styles.statuses}>
        {gameStatus === gameStatuses.INIT && !isConnectionError && (
          <span>Разметите корабли на доске</span>
        )}
        {isPlaying && (
          <span>{isUserTurn ? "Ваш ход." : "Ход противника."}</span>
        )}
        {isConnectionError && <span>Ошибка подключения к серверу</span>}
        {isAwaiting && <span>Ожидание пользователя</span>}
      </div>
    </header>
  );
};

export default Header;
