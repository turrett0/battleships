import {nanoid} from "nanoid";
import {FC, Fragment} from "react";
import {requireServerShoot} from "../../../api/socketIO/actions";
import {useAppSelector} from "../../../hooks/store/useAppSelector";
import {ICell} from "../../../models/Cell";
import {gameStatuses} from "../../../store/slices/appSlice/state";
import {IShoot} from "../../../store/slices/boardSlice";
import PartnerCell from "../../Cell/PartnerCell";
import LetterBlock from "../../LetterBlock/LetterBlock";
import StartGameBox from "../../StartGameBox/StartGameBox";
import styles from "./PartnerBoardComponent.module.scss";

const PartnerBoardComponent: FC = () => {
  const userID = useAppSelector(({app}) => app.userData?.userID);
  const board = useAppSelector((app) => app.board.partnerBoard);
  const isUserTurn = useAppSelector(({app}) => app.gameData.isUserTurn);
  const gameStatus = useAppSelector(({app}) => app.gameData.status);
  const isGameInProgress =
    gameStatus !== gameStatuses.INIT && gameStatus !== gameStatuses.AWAITING;

  const onClickHandler = (target: ICell) => {
    if (userID && isGameInProgress) {
      const newShoot: IShoot = {
        coords: {
          x: target.x,
          y: target.y,
        },
        userID,
        isShooted: null,
        destroyedShipData: null,
      };
      requireServerShoot(newShoot);
    }
  };

  return (
    <div className={`${styles.container} `}>
      <span>Доска пользователя {board.username}</span>
      <div className={styles["partner__board-inner"]}>
        <div
          className={`${styles.board} ${
            !isUserTurn || !isGameInProgress ? styles.disabled : ""
          }`}
        >
          <LetterBlock
            content={["А", "Б", "В", "Г", "Д", "Е", "Ж", "З", "И", "К"]}
            role={"horizontal"}
            key={nanoid()} //set every render
          />
          <LetterBlock
            content={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            role={"vertical"}
            key={nanoid()} //set every render
          />
          {board.cells.map((row, index) => (
            <Fragment key={index}>
              {row.map((cell) => (
                <PartnerCell
                  callback={onClickHandler}
                  cell={cell}
                  key={cell.id}
                />
              ))}
            </Fragment>
          ))}
        </div>
        {!isGameInProgress && <StartGameBox />}
      </div>
    </div>
  );
};

export default PartnerBoardComponent;
