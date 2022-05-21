import React, {FC} from "react";
import {IShip} from "../../models/Ship";
import styles from "./ShipPlaceholder.module.scss";

interface Props {
  ship: IShip;
}

const ShipPlaceholder: FC<Props> = ({ship}) => {
  let shipHealth;
  switch (ship.health) {
    case 1:
      shipHealth = styles.healthLow;
      break;
    case 2:
      shipHealth = styles.healthHalf;
      break;
    case 3:
      shipHealth = styles.healthMuch;
      break;
    case 4:
      shipHealth = styles.healthFull;
      break;
  }
  return (
    <div className={`${styles.ship} ${styles[ship.size]} `}>
      <div className={` ${styles.shrek} ${shipHealth}`}></div>
    </div>
  );
};

export default ShipPlaceholder;
