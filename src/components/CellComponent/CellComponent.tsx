import React, {FC, useState} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
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
    setIsDragging,
    removeHighlightCell,
    moveBoardElement,
  } = useActions();
  const isDraggingStore = useAppSelector(({board}) => board.isDragging);
  function onDragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
    removeHighlightCell(cell);
  }

  const onDragOverHandler = useThrottle(
    (e: React.DragEvent<HTMLDivElement>) => {
      if (!cell.highlighted) {
        setHighlightCell(cell);

        if (!isDraggingStore) {
          setIsDragging(true);
        }
      }
    },
    300
  );

  function onDropHandler(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setShipToCell(cell);
    removeHighlightCell(cell);
    setDraggingShip(null);
    setIsDragging(false);
  }
  return (
    <div
      draggable={cell.ship ? true : false}
      className={`${styles.cell} ${
        cell.isShooted ? (cell.ship ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.ship ? styles.setted : ""
      }`}
      onDragStart={(e) => {
        let div = document.createElement("div");
        e.dataTransfer.setDragImage(div, 0, 0);
        if (cell.ship) {
          setIsDragging(true);
          moveBoardElement(cell.ship);
        }
      }}
      // onMouseDown={(e) => {
      //   console.log("down", e);
      //   setIsDraggable(true);
      // }}
      // onMouseUp={(e) => {
      //   console.log("up", e);
      //   setIsDraggable(false);
      // }}
      onClick={() => onClickHandler(cell)}
      onDragLeave={(e) => {
        onDragLeaveHandler(e);
      }}
      onDragEnd={() => {
        setIsDragging(false);
      }}
      onDragOver={(e) => {
        e.preventDefault();
        onDragOverHandler(e);
      }}
      onDrop={(e) => {
        onDropHandler(e);
      }}
    />
  );
};

export default CellComponent;
