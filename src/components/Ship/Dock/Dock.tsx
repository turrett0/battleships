import React, {useState} from "react";
import {Ship, shipSizes} from "../../../models/Ship";
import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
const Dock = () => {
  const [docks, setDocks] = useState<Ship[][]>([
    new Array(4).fill(new Ship(shipSizes.SMALL, null)),
    new Array(3).fill(new Ship(shipSizes.MIDDLE, null)),
    new Array(2).fill(new Ship(shipSizes.BIG, null)),
    new Array(1).fill(new Ship(shipSizes.VERY_BIG, null)),
  ]);

  return (
    <div className={styles.port}>
      {docks.map((dock) => (
        <div className={styles.dock}>
          {dock.map((ship) => (
            <ShipComponent ship={ship} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default Dock;
