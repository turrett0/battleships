import {FC} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {ICell} from "../../models/Cell";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: ICell;
  setCell: (cell: ICell | null) => void;
}

const CellComponent: FC<Props> = ({cell, setCell}) => {
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const {setShipToCell, setHighlightCell, removeHighlightCell} = useActions();

  const onMouseDownHandler = () => {
    // if (cell.ship) {
    //   rotateElement(cell);
    // }
    setCell(cell);
  };

  const onMouseUpHandler = () => {
    setCell(cell);
    setShipToCell(cell);
  };

  return (
    <div
      className={`${styles.cell} ${
        cell.isShooted ? (cell.ship ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.isCanNotPlace ? styles.canNotPlace : ""
      } ${cell.ship ? styles.setted : ""}`}
      onMouseOver={() => {
        if (!cell.highlighted && isDraggingGlobal) {
          setHighlightCell(cell);
        }
      }}
      onMouseLeave={() => {
        if (isDraggingGlobal) {
          removeHighlightCell(cell);
        }
      }}
      onMouseUp={onMouseUpHandler}
      onMouseDown={onMouseDownHandler}
    />
  );
};

export default CellComponent;
