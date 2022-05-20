import React, {FC, useEffect, useState} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {IShip} from "../../models/Ship";
import styles from "./ShipComponent.module.scss";

interface Props {
  ship: IShip;
}

const ShipComponent: FC<Props> = ({ship}) => {
  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const {setDraggingShip, setIsDragging} = useActions();
  const dock = useAppSelector(({board}) => board.dock);
  const [isSetted, setIsSetted] = useState<boolean>(false);
  const draggingElement = useAppSelector(({board}) => board.draggingShip);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const findCurrent = dock.find((dockShip) => dockShip.id === ship.id);

  useEffect(() => {
    console.log("is setted:", isSetted);
  }, [isSetted]);

  useEffect(() => {
    if (findCurrent) {
      setIsSetted(true);
    } else {
      setIsSetted(false);
    }
  }, [dock]);

  useEffect(() => {
    if (isDraggingGlobal && draggingElement?.id === ship.id) {
      setIsSetted(true);
    } else if (!isDraggingGlobal && draggingElement?.id === ship.id) {
      setIsSetted(false);
    }
  }, [isDraggingGlobal]);

  function onDragStartHandler(
    e: React.DragEvent<HTMLDivElement>,
    ship: IShip
  ): void {
    setIsDraggingState(true);
    setDraggingShip(ship);
  }

  function onDragEndHandler(e: React.DragEvent<HTMLDivElement>) {
    setIsDraggingState(false);
    setIsDragging(false);

    if (!findCurrent) {
      setIsSetted(false);
    }
  }

  return (
    <div
      onDragStart={(e) => onDragStartHandler(e, ship)}
      onDragEnd={(e) => {
        onDragEndHandler(e);
      }}
      draggable={true}
      className={`${styles.ship} ${styles[ship.size]} ${
        isDraggingState ? styles.candrag : ""
      }  ${isSetted ? styles.setted : ""}`}
    />
  );
};

export default ShipComponent;
