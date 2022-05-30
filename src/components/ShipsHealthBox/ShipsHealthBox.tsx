import {FC} from "react";
import styles from "./ShipsHealthBox.module.scss";
import {useAppSelector} from "../../hooks/store/useAppSelector";

import ShipPlaceholder from "../ShipPlaceholder/ShipPlaceholder";
import {IShip, shipSizes} from "../../models/Ship";

const ShipsHealthBox: FC = () => {
  const dock = useAppSelector(({board}) => board.dock);
  const veryBigShip = dock.filter((ship) => ship.size === shipSizes.VERY_BIG);
  const bigShips = dock.filter((ship) => ship.size === shipSizes.BIG);
  const middleShips = dock.filter((ship) => ship.size === shipSizes.MIDDLE);
  const smallShips = dock.filter((ship) => ship.size === shipSizes.SMALL);

  return (
    <div className={styles.box}>
      <div className={styles.dock}>
        {veryBigShip.map((ship: IShip) => (
          <ShipPlaceholder ship={ship} key={`box-${ship.id}`} />
        ))}
      </div>
      <div className={styles.dock}>
        {bigShips.map((ship: IShip) => (
          <ShipPlaceholder ship={ship} key={`box-${ship.id}`} />
        ))}
      </div>
      <div className={styles.dock}>
        {middleShips.map((ship: IShip) => (
          <ShipPlaceholder ship={ship} key={`box-${ship.id}`} />
        ))}
      </div>
      <div className={styles.dock}>
        {smallShips.map((ship: IShip) => (
          <ShipPlaceholder ship={ship} key={`box-${ship.id}`} />
        ))}
      </div>
    </div>
  );
};

export default ShipsHealthBox;
