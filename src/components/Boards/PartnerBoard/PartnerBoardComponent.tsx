import {nanoid} from "nanoid";
import {FC, Fragment} from "react";
import {useAppSelector} from "../../../hooks/store/useAppSelector";
import {ICell} from "../../../models/Cell";
import PartnerCell from "../../Cell/PartnerCell";
import LetterBlock from "../../LetterBlock/LetterBlock";
import styles from "./PartnerBoardComponent.module.scss";

const UserBoardComponent: FC = () => {
  const board = useAppSelector((app) => app.board.partnerBoard);
  const isUserTurn = useAppSelector(({app}) => app.isUserTurn);

  const onClickHandler = (target: ICell) => {
    // if (board.isControlable) {
    console.log(target);
    target.isShooted = true;
    // }
  };

  return (
    <div className={styles.container}>
      <span>Доска пользователя {board.username}</span>
      <div className={`${styles.board} ${isUserTurn ? styles.disabled : ""}`}>
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

export default UserBoardComponent;
