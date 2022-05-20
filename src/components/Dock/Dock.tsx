import React, {useState} from "react";
import {createShip, IShip, shipSizes} from "../../models/Ship";
import ShipComponent from "../Ship/ShipComponent";
import styles from "./Dock.module.scss";
import {nanoid} from "nanoid";
const Dock = () => {
  const [docks] = useState<IShip[][]>([
    [
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
      createShip(shipSizes.SMALL, null),
    ],
    [
      createShip(shipSizes.MIDDLE, null),
      createShip(shipSizes.MIDDLE, null),
      createShip(shipSizes.MIDDLE, null),
    ],
    [createShip(shipSizes.BIG, null), createShip(shipSizes.BIG, null)],
    [createShip(shipSizes.VERY_BIG, null)],
  ]);

  return (
    <div className={styles.port}>
      {docks.map((dock) => (
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
