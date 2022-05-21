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
  const {setIsHiddenDraggableElement} = useActions();
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const draggingElement = useAppSelector(({board}) => board.draggingShip);

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
          onMouseEnter={() => {
            if (isDraggingGlobal && draggingElement) {
              setIsHiddenDraggableElement(true);
            }
          }}
          onMouseLeave={() => {
            if (isDraggingGlobal && draggingElement) {
              console.log("leave");
              setIsHiddenDraggableElement(false);
            }
          }}
        >
          {board.cells.map((row, index) => (
            <Fragment key={index}>
              {row.map((cell) => (
                <CellComponent cell={cell} key={cell.id} />
              ))}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserBoardComponent;
