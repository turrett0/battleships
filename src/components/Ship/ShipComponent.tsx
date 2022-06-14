import {FC, useCallback, useEffect, useRef, useState} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import useActions from "../../hooks/useActions";
import {IShip} from "../../models/Ship";
import {connectionStatuses} from "../../store/slices/appSlice/state";
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
  const isConnectionError =
    useAppSelector(({app}) => app.connectionStatus) ===
    connectionStatuses.ERROR;

  const endDrag = () => {
    document.removeEventListener("pointermove", mouseMoveHandler);

    if (shipRef.current) {
      setDraggingShip(null);
      shipRef.current.style.position = "relative";
      shipRef.current.style.left = 0 + "px";
      shipRef.current.style.top = 0 + "px";
      setIsDraggingState(false);
      setIsDragging(false);
      setIsSetted(true);
    }
  };

  useEffect(() => {
    if (!findCurrent && !isDraggingGlobal) {
      setIsSetted(false);
    } else if (!isDraggingGlobal && findCurrent) {
      endDrag();
    }
  }, [findCurrent, isDraggingGlobal]);

  const mouseMoveHandler = useCallback((e: PointerEvent) => {
    if (shipRef.current) {
      shipRef.current.style.position = "absolute";
      shipRef.current.style.left = e.x + "px";
      shipRef.current.style.top = e.y + "px";
    }
  }, []);

  return (
    <div
      className={` ${styles[ship.size]} ${
        isSetted || draggingElement?.id === ship.id ? styles.setted : ""
      }`}
    >
      <div
        className={`${styles.ship} ${styles[ship.size]} ${
          isDraggingState ? styles.candrag : ""
        }  ${
          isSetted ||
          (isHiddenDraggableElement && draggingElement?.id === ship.id)
            ? styles.hidden
            : ""
        } ${isConnectionError ? styles.setted : ""}`}
        ref={shipRef}
        onPointerDown={(e) => {
          const element = e.target as HTMLElement;
          element.releasePointerCapture(e.pointerId);
          if (shipRef.current && !findCurrent && !isConnectionError) {
            setDraggingShip(ship);
            setIsDraggingState(true);
            setIsDragging(true);
            document.addEventListener("pointermove", mouseMoveHandler);
          }
        }}
        onPointerUp={(e) => {
          const element = e.target as HTMLElement;
          element.releasePointerCapture(e.pointerId);
          endDrag();
        }}
      />
    </div>
  );
};

export default ShipComponent;
