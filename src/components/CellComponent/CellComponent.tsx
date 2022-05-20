import React, {FC} from "react";
import useActions from "../../hooks/useActions";
import {useThrottle} from "../../hooks/useThrottle";
import {ICell} from "../../models/Cell";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: ICell;
  onClickHandler: (target: ICell) => void;
}

const CellComponent: FC<Props> = ({cell, onClickHandler}) => {
  const {
    setShipToCell,
    setDraggingShip,
    setHighlightCell,
    removeHighlightCell,
  } = useActions();
  function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    // cell.highlighted = false;
    removeHighlightCell(cell);
  }

  const onDragOverHandler = useThrottle(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!cell.highlighted) {
        setHighlightCell(cell);
      }
    },
    300
  );

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setShipToCell(cell);
    removeHighlightCell(cell);
    setDraggingShip(null);
  }
  return (
    <div
      className={`${styles.cell} ${
        cell.isShooted ? (cell.ship ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.ship ? styles.setted : ""
      }`}
      onClick={() => onClickHandler(cell)}
      onDragLeave={(e) => {
        onDragLeaveHandler(e);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverHandler(e);
      }}
      onDrop={(e) => {
        onDropHandler(e);
      }}
    ></div>
  );
};

export default CellComponent;
