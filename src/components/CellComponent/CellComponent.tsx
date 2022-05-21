import {FC} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {ICell} from "../../models/Cell";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: ICell;
}

const CellComponent: FC<Props> = ({cell}) => {
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const draggingElement = useAppSelector(({board}) => board.draggingShip);
  const {
    setShipToCell,
    setHighlightCell,
    setIsDragging,
    removeHighlightCell,
    changeElementPosition,
    setDraggingShip,
    rotateElement,
  } = useActions();

  const onMouseUpHandler = () => {
    if (!draggingElement) {
      removeHighlightCell(cell);
      setDraggingShip(null);
    }
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
      onMouseDown={() => {
        console.log(cell.ship);
        document.addEventListener("keydown", (keyEvent) => {
          console.log("key pressed", keyEvent.key);
          if (cell.ship) {
            rotateElement(cell);
          }
        });
        // setIsMouseDown(true);
        if (cell.ship && !isDraggingGlobal) {
          //replace placed element
          setIsDragging(true);
          changeElementPosition(cell.ship);
          setHighlightCell(cell);
        }
      }}
    />
  );
};

export default CellComponent;
