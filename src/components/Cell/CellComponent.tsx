import {FC, useRef} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {ICell} from "../../models/Cell";
import {gameStatuses} from "../../store/slices/appSlice/state";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: ICell;
  setCell: (cell: ICell | null) => void;
}

const CellComponent: FC<Props> = ({cell, setCell}) => {
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const isGameInProgress =
    useAppSelector(({app}) => app.gameData.status) !== gameStatuses.INIT;
  const {setShipToCell, setHighlightCell, removeHighlightCell, rotateElement} =
    useActions();

  const onMouseUpHandler = () => {
    if (!isGameInProgress) {
      setCell(null);
      if (isDraggingGlobal) {
        setShipToCell(cell);
      }

      if (cell.ship && !isDraggingGlobal) {
        rotateElement(cell);
      }
    }
  };

  return (
    <div
      className={`${styles.cell} ${
        cell.checked ? (cell.isShooted ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.isCanNotPlace ? styles.canNotPlace : ""
      } ${cell.ship ? styles.setted : ""} ${
        cell.isCompletelyDestroyed ? styles["cell__completely__destroyed"] : ""
      }`}
      onPointerOver={() => {
        if (!cell.highlighted && isDraggingGlobal && !isGameInProgress) {
          setHighlightCell(cell);
        }
      }}
      onPointerLeave={() => {
        if (isDraggingGlobal && !isGameInProgress) {
          removeHighlightCell(cell);
        }
      }}
      onPointerUp={onMouseUpHandler}
      onPointerDown={(e) => {
        const element = e.target as HTMLElement;
        element.releasePointerCapture(e.pointerId);
        if (!isGameInProgress) {
          setCell(cell);
        }
      }}
    />
  );
};

export default CellComponent;
