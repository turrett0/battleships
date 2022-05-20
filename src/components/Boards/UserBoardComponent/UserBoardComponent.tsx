import {FC, Fragment} from "react";
import {useAppSelector} from "../../../hooks/store/useAppSelector";
import {roles} from "../../../models/Board";
import {ICell} from "../../../models/Cell";
import CellComponent from "../../CellComponent/CellComponent";

import styles from "./UserBoardComponent.module.scss";

const UserBoardComponent: FC = () => {
  const board = useAppSelector((app) => app.board.userBoard);

  const onClickHandler = (target: ICell) => {
    console.log(target);
  };

  return (
    <div className={styles.container}>
      <span>
        {board.role === roles.USER
          ? "Моя Доска"
          : `Доска пользователя ${board.username}`}
      </span>
      <div className={styles.board}>
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                onClickHandler={onClickHandler}
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
