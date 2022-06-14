import {FC} from "react";
import {
  requireServerPrivateGame,
  requireServerJoinPrivateGame,
  requireServerNewGame,
} from "../../api/socketIO/actions";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import CustomButton from "../CustomButton/CustomButton";
import styles from "./StartGameBox.module.scss";
import {AiFillCopy as CopyIcon} from "react-icons/ai";
import {gameStatuses} from "../../store/slices/appSlice/state";
import useActions from "../../hooks/useActions";

const StartGameBox: FC = () => {
  const dock = useAppSelector(({board}) => board.dock);
  const {setIsPrivateGame} = useActions();
  const sessionID = useAppSelector(({app}) => app.gameData.sessionID);
  const isPrivateGame = useAppSelector(({app}) => app.gameData.isPrivateGame);
  const shareLink = `${window.location.href}#/id${sessionID}`;

  const isGameInProgress =
    useAppSelector(({app}) => app.gameData.status) !== gameStatuses.INIT;

  const startGameHandler = () => {
    if (isPrivateGame && !sessionID) {
      requireServerPrivateGame(dock);
    } else if (sessionID && isPrivateGame) {
      requireServerJoinPrivateGame(dock, sessionID);
    } else {
      requireServerNewGame(dock);
    }
  };

  return (
    <div className={styles["start__game__box"]}>
      <div className={styles["choose__box"]}>
        <span>Противник</span>

        <div className={styles["choose__box-inner"]}>
          <label
            className={`${
              isPrivateGame && isGameInProgress ? styles["disabled"] : ""
            }`}
          >
            <span
              className={`${styles["choose__box-text"]} ${
                !isPrivateGame ? styles["active"] : ""
              }`}
            >
              Случайный
            </span>
            <input
              className={`${styles["start__game__box-radio"]}`}
              type="radio"
              name="gameMode"
              disabled={isPrivateGame && isGameInProgress}
              checked={!isPrivateGame}
              onChange={() => setIsPrivateGame(false)}
            />
          </label>
          <label>
            <span
              className={`${styles["choose__box-text"]} ${
                isPrivateGame ? styles["active"] : ""
              }`}
            >
              Знакомый
            </span>
            <input
              className={styles["start__game__box-radio"]}
              type="radio"
              name="gameMode"
              checked={isPrivateGame}
              onChange={() => setIsPrivateGame(true)}
            />
          </label>
        </div>
      </div>
      {((isGameInProgress && !sessionID) || (isPrivateGame && sessionID)) && (
        <>
          <span>Ссылка на Вашу игру: </span>
          <div
            className={styles["start__game__box-link"]}
            onClick={() => {
              navigator.clipboard.writeText(shareLink);
            }}
          >
            <span> {shareLink}</span>
            <CopyIcon />
          </div>
        </>
      )}
      {!isGameInProgress && (
        <CustomButton disabled={dock.length !== 10} callback={startGameHandler}>
          Начать игру
        </CustomButton>
      )}
    </div>
  );
};

export default StartGameBox;
