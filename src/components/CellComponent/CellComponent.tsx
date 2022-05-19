import React, {FC} from "react";
import {Cell} from "../../models/Cell";
import styles from "./CellComponent.module.scss";

interface Props {
  cell: Cell;
}

const CellComponent: FC<Props> = ({cell}) => {
  return <div className={styles.cell} />;
};

export default CellComponent;
