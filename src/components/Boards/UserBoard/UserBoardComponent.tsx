import {nanoid} from "nanoid";
import {FC, Fragment, useCallback, useEffect, useRef, useState} from "react";

import {useAppSelector} from "../../../hooks/store/useAppSelector";
import useActions from "../../../hooks/useActions";
import {ICell} from "../../../models/Cell";
import {gameStatuses} from "../../../store/slices/appSlice/state";
import CellComponent from "../../Cell/CellComponent";
import LetterBlock from "../../LetterBlock/LetterBlock";

import styles from "./UserBoardComponent.module.scss";

const UserBoardComponent: FC = () => {
  const board = useAppSelector((app) => app.board.userBoard);
  const isGameInProgress =
    useAppSelector(({app}) => app.gameData.status) !== gameStatuses.INIT;
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const draggingElement = useAppSelector(({board}) => board.draggingShip);
  const boardRef = useRef<HTMLDivElement>(null);
  const [cell, setCell] = useState<ICell | null>(null);
  const {
    setIsHiddenDraggableElement,
    changeElementPosition,
    setIsDragging,
    setDraggingShip,
  } = useActions();

  const mouseMoveHandler = useCallback(
    (e: PointerEvent) => {
      const element = e.target as HTMLElement;
      element.releasePointerCapture(e.pointerId);
      if (cell && cell.ship && !isDraggingGlobal) {
        if (!isDraggingGlobal) {
          setIsDragging(true);
        }
        setDraggingShip(cell.ship);
        changeElementPosition(cell.ship);
      }
    },
    [cell, isDraggingGlobal]
  );

  useEffect(() => {
    if (boardRef.current && cell) {
      boardRef.current.addEventListener("pointermove", mouseMoveHandler);
    }
    return () => {
      if (boardRef.current) {
        boardRef.current.removeEventListener("pointermove", mouseMoveHandler);
      }
    };
  }, [mouseMoveHandler, cell]);

  return (
    <div
      className={`${styles.container} ${
        !isGameInProgress ? styles["container__selectable"] : ""
      }`}
    >
      <span>Моя Доска</span>
      <div
        ref={boardRef}
        className={styles.board}
        draggable={false}
        onPointerEnter={(e) => {
          const element = e.target as HTMLElement;
          element.releasePointerCapture(e.pointerId);
          if (isDraggingGlobal && draggingElement) {
            setIsHiddenDraggableElement(true);
          }
        }}
        onPointerLeave={(e) => {
          if (isDraggingGlobal && draggingElement) {
            setIsHiddenDraggableElement(false);
          }
        }}
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
              <CellComponent setCell={setCell} cell={cell} key={cell.id} />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default UserBoardComponent;
