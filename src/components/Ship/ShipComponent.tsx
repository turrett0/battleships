import React, {FC, useState} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {IShip} from "../../models/Ship";
import styles from "./ShipComponent.module.scss";

interface Props {
  ship: IShip;
}

const ShipComponent: FC<Props> = ({ship}) => {
  const {setDraggingShip, setIsDragging} = useActions();
  const dock = useAppSelector(({board}) => board.dock);
  const [isSetted, setIsSetted] = useState<boolean>(false);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);

  function onDragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    ship: IShip
  ): void {
    setIsDraggingState(true);
    setDraggingShip(ship);
  }

  function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    let findCurrent = dock.find((dockShip) => dockShip.id === ship.id);
    if (findCurrent) {
      setIsSetted(true);
    }
    setIsDraggingState(false);
    setIsDragging(false);
  }

  function onDropHandler(e: React.DragEvent<HTMLDivElement>, ship: IShip) {
    console.log("drop");

    e.preventDefault();
  }

  return (
    <div
      onDragStart={(e) => onDragStartHandler(e, ship)}
      onDragEnd={(e) => {
        onDragEndHandler(e);
      }}
      onDrop={(e) => {
        console.log("drop");
        onDropHandler(e, ship);
      }}
      draggable={true}
      className={`${styles.ship} ${styles[ship.size]} ${
        isDraggingState ? styles.candrag : ""
      }  ${isSetted ? styles.setted : ""}`}
    />
  );
};

export default ShipComponent;
