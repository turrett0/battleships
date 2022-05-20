import React, {FC, useState} from "react";
import useActions from "../../hooks/useActions";
import {IShip} from "../../models/Ship";
import styles from "./ShipComponent.module.scss";

interface Props {
  ship: IShip;
}

const ShipComponent: FC<Props> = ({ship}) => {
  const {setDraggingShip} = useActions();
  const [isSetted, setIsSetted] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  function onDragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    ship: IShip
  ): void {
    setIsDragging(true);
    setDraggingShip(ship);
  }

  function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    setIsSetted(true);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>, ship: IShip) {
    e.preventDefault();
  }

  return (
    <div className={styles.dock}>
      <div
        onDragStart={(e) => onDragStartHandler(e, ship)}
        onDragEnd={(e) => {
          onDragEndHandler(e);
        }}
        onDrop={(e) => {
          onDropHandler(e, ship);
        }}
        draggable={!isSetted}
        className={`${styles.ship} ${styles[ship.size]} ${
          isDragging ? styles.candrag : ""
        }  ${isSetted ? styles.setted : ""}`}
      ></div>
    </div>
  );
};

export default ShipComponent;
