import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
import {nanoid} from "nanoid";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import CustomButton from "../CustomButton/CustomButton";
import useActions from "../../hooks/useActions";
const Dock = () => {
  const initDock = useAppSelector(({board}) => board.initDock);
  const {clearBoard} = useActions();

  return (
    <div className={styles.container}>
      <div className={styles.port}>
        {initDock.map((dock) => (
          <div className={styles.dock} key={nanoid()}>
            {dock.map((ship) => (
              <ShipComponent ship={ship} key={ship.id} />
            ))}
          </div>
        ))}
      </div>
      <CustomButton callback={clearBoard}>Сброс</CustomButton>
    </div>
  );
};

export default Dock;
