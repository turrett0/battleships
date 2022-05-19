import React, {useState} from "react";
import {Ship, shipSizes} from "../../../models/Ship";
import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
const Dock = () => {
  const [ships, setShips] = useState<Ship[]>([
    new Ship(shipSizes.SMALL, null),
    new Ship(shipSizes.SMALL, null),
    new Ship(shipSizes.SMALL, null),
    new Ship(shipSizes.SMALL, null),
  ]);

  return (
    <div className={styles.dock}>
      {ships.map((ship) => (
        <ShipComponent ship={ship} />
      ))}
    </div>
  );
};

export default Dock;
