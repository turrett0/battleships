import {nanoid} from "nanoid";
import {FC, Fragment} from "react";
import {requireServerShoot} from "../../../api/socketIO/actions";
import {useAppSelector} from "../../../hooks/store/useAppSelector";
import useActions from "../../../hooks/useActions";
import {ICell} from "../../../models/Cell";
import {gameStatuses} from "../../../store/slices/appSlice/state";
import {IShoot} from "../../../store/slices/boardSlice";
import PartnerCell from "../../Cell/PartnerCell";
import LetterBlock from "../../LetterBlock/LetterBlock";
import styles from "./PartnerBoardComponent.module.scss";

const PartnerBoardComponent: FC = () => {
  const userID = useAppSelector(({app}) => app.userData?.userID);
  const board = useAppSelector((app) => app.board.partnerBoard);
  const isUserTurn = useAppSelector(({app}) => app.isUserTurn);
  const isGameInProgress =
    useAppSelector(({app}) => app.gameData.status) !== gameStatuses.INIT;

  const onClickHandler = (target: ICell) => {
    if (userID && isGameInProgress) {
      const newShoot: IShoot = {
        coords: {
          x: target.x,
          y: target.y,
        },
        userID,
        isShooted: null,
      };
      requireServerShoot(newShoot);
    }
  };

  return (
    <div className={styles.container}>
      <span>Доска пользователя {board.username}</span>
      <div className={`${styles.board} ${!isUserTurn ? styles.disabled : ""}`}>
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
    </div>
  );
};

export default PartnerBoardComponent;
