import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import CustomButton from "../CustomButton/CustomButton";
import useActions from "../../hooks/useActions";
import {useEffect} from "react";
const Dock = () => {
  const initDock = useAppSelector(({board}) => board.initDock);
  const {clearBoard} = useActions();
  const isDockEmpty = useAppSelector(({board}) => board.dock).length === 10;

  useEffect(() => {
    if (isDockEmpty) {
      document.documentElement.style.touchAction = "initial";
    } else {
      document.documentElement.style.touchAction = "none";
    }
  }, [isDockEmpty]);

  return (
    <div className={styles.container}>
      {!isDockEmpty && (
        <div className={styles.port}>
          {initDock.map((dock) => (
            <div className={styles["port__dock"]} key={dock.id}>
              {dock.port.map((ship) => (
                <ShipComponent ship={ship} key={ship.id} />
              ))}
            </div>
          ))}
        </div>
      )}
      <CustomButton callback={clearBoard}>Сброс</CustomButton>
    </div>
  );
};

export default Dock;
