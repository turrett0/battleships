import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
import {nanoid} from "nanoid";
import {useAppSelector} from "../../hooks/store/useAppSelector";
const Dock = () => {
  const initDock = useAppSelector(({board}) => board.initDock);

  return (
    <div className={styles.port}>
      {initDock.map((dock) => (
        <div className={styles.dock} key={nanoid()}>
          {dock.map((ship) => (
            <ShipComponent ship={ship} key={ship.id} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dock;
