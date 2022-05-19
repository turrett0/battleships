import React, {FC, useState} from "react";
import {Cell} from "../../models/Cell";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: Cell;
  onClickHandler: (target: Cell) => void;
  updateBoard: () => void;
}

const CellComponent: FC<Props> = ({cell, onClickHandler, updateBoard}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false);

  function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    setIsSelected(false);
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsSelected(true);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    let ship = JSON.parse(e.dataTransfer.getData("ship"));
    cell.addShip(ship);
    setIsSelected(false);
    updateBoard();
  }
  return (
    <div
      className={`${styles.cell} ${cell.checked ? styles.missed : ""} ${
        isSelected ? styles.selected : ""
      } ${cell.ship ? styles.setted : ""}`}
      onClick={() => onClickHandler(cell)}
      onDragLeave={(e) => {
        onDragLeaveHandler(e);
      }}
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => {
        onDropHandler(e);
      }}
    ></div>
  );
};

export default CellComponent;
