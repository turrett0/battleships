import React, {FC, useState} from "react";
import {useThrottle} from "../../hooks/useThrottle";
import {Cell} from "../../models/Cell";
import {Ship} from "../../models/Ship";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: Cell;
  onClickHandler: (target: Cell) => void;
  updateBoard: () => void;
  onDragShipHandler: (target: Cell, ship: Ship) => void;
}

const CellComponent: FC<Props> = ({
  cell,
  onClickHandler,
  updateBoard,
  onDragShipHandler,
}) => {
  let test = useThrottle((e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
  }, 1000);

  function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    cell.highlighted = false;
    updateBoard();
  }

  function onDragOverHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    test(e);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    let ship = JSON.parse(e.dataTransfer.getData("ship"));
    cell.addShip(ship);
    // setIsSelected(false);
    updateBoard();
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
      onDragOver={(e) => onDragOverHandler(e)}
      onDrop={(e) => {
        onDropHandler(e);
      }}
    ></div>
  );
};

export default CellComponent;
