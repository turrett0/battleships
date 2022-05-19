import React, {FC, useState} from "react";
import {Ship, shipSizes} from "../../../models/Ship";
import styles from "./ShipComponent.module.scss";

interface Props {
  ship: Ship;
}

const ShipComponent: FC<Props> = ({ship}) => {
  const [isSetted, setIsSetted] = useState<boolean>(false);

  function onDragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    ship: Ship
  ): void {
    console.log("drag", ship);
    e.dataTransfer.setData("ship", JSON.stringify(ship));
  }

  function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    console.log("dragEnd");
    setIsSetted(true);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>, ship: Ship) {
    e.preventDefault();
    e.dataTransfer.setData("ship", JSON.stringify(ship));
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
        className={`${styles.ship} ${styles[ship.size]}  ${
          isSetted ? styles.setted : ""
        }`}
      ></div>
    </div>
  );
};

export default ShipComponent;
