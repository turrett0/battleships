import React, {FC, useCallback, useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {IShip} from "../../models/Ship";
import styles from "./ShipComponent.module.scss";

interface Props {
  ship: IShip;
}

const ShipComponent: FC<Props> = ({ship}) => {
  const shipRef = useRef<HTMLDivElement | null>(null);

  const isDraggingGlobal = useAppSelector(({board}) => board.isDragging);
  const {setDraggingShip, setIsDragging} = useActions();
  const dock = useAppSelector(({board}) => board.dock);
  const [isSetted, setIsSetted] = useState<boolean>(false);
  const draggingElement = useAppSelector(({board}) => board.draggingShip);
  const [isDraggingState, setIsDraggingState] = useState<boolean>(false);
  const findCurrent = dock.find((dockShip) => dockShip.id === ship.id);
  const isHiddenDraggableElement = useAppSelector(
    ({board}) => board.isHiddenDraggableElement
  );

  const endDrag = () => {
    document.removeEventListener("mousemove", mouseMoveHandler);
    if (shipRef.current) {
      setDraggingShip(null);
      shipRef.current.style.position = "relative";
      shipRef.current.style.left = 0 + "px";
      shipRef.current.style.top = 0 + "px";
      setIsDraggingState(false);
      setIsDragging(false);
    }
  };

  useEffect(() => {
    if (!isDraggingGlobal && findCurrent) {
      endDrag();
    }
  }, [isDraggingGlobal]);

  const mouseMoveHandler = useCallback((e: MouseEvent) => {
    if (shipRef.current) {
      shipRef.current.style.position = "absolute";
      shipRef.current.style.left = e.clientX + "px";
      shipRef.current.style.top = e.clientY + "px";
    }
  }, []);

  useEffect(() => {
    if (findCurrent && draggingElement?.id === ship.id) {
      setIsSetted(true);
    } else if (!findCurrent) {
      setIsSetted(false);
    }
  }, [findCurrent, draggingElement]);

  return (
    <div
      className={` ${styles[ship.size]} ${
        isSetted || draggingElement?.id === ship.id ? styles.setted : ""
      }`}
    >
      <div
        ref={shipRef}
        onMouseDown={() => {
          if (shipRef.current && !findCurrent) {
            setDraggingShip(ship);
            setIsDraggingState(true);
            setIsDragging(true);
            document.addEventListener("mousemove", mouseMoveHandler);
          }
        }}
        onMouseUp={endDrag}
        className={`${styles.ship} ${styles[ship.size]} ${
          isDraggingState ? styles.candrag : ""
        }  ${
          isSetted ||
          (isHiddenDraggableElement && draggingElement?.id === ship.id)
            ? styles.hidden
            : ""
        } `}
      />
    </div>
  );
};

export default ShipComponent;
