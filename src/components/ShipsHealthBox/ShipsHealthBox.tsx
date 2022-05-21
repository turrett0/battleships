import {FC} from "react";
import styles from "./ShipsHealthBox.module.scss";
import {useAppSelector} from "../../hooks/store/useAppSelector";

import ShipPlaceholder from "../ShipPlaceholder/ShipPlaceholder";

const ShipsHealthBox: FC = () => {
  const dock = useAppSelector(({board}) => board.dock);

  return (
    <div className={styles.box}>
      {dock.map((ship) => (
        <div>
          <ShipPlaceholder ship={ship} key={`box-${ship.id}`} />
        </div>
      ))}
    </div>
  );
};

export default ShipsHealthBox;
