import {nanoid} from "nanoid";
import {FC, Fragment} from "react";
import {useAppSelector} from "../../../hooks/store/useAppSelector";
import useActions from "../../../hooks/useActions";
import {roles} from "../../../models/Board";
import {ICell} from "../../../models/Cell";
import CellComponent from "../../CellComponent/CellComponent";
import LetterBlock from "../../LetterBlock/LetterBlock";

import styles from "./UserBoardComponent.module.scss";

const UserBoardComponent: FC = () => {
  const board = useAppSelector((app) => app.board.userBoard);
  const isHiddenDraggableElement = useAppSelector(
    ({board}) => board.isHiddenDraggableElement
  );
  const {setMouseOverGrid} = useActions();

  const onClickHandler = (target: ICell) => {
    console.log(target);
  };

  return (
    <div>
      <div className={styles.container}>
        <span>
          {board.role === roles.USER
            ? "Моя Доска"
            : `Доска пользователя ${board.username}`}
        </span>
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
        <div
          className={styles.board}
          draggable={false}
          onDragEnter={(e) => {
            if (!isHiddenDraggableElement) {
              setMouseOverGrid(true);
              console.log("enter grid");
              console.log(e.target, e.currentTarget);
            }
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            console.log("leave");
            // setMouseOverGrid(false);
          }}
        >
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
    </div>
  );
};

export default UserBoardComponent;
