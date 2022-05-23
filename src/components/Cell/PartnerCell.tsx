import {FC} from "react";
import {ICell} from "../../models/Cell";
import styles from "./PartnerCell.module.scss";

interface Props {
  cell: ICell;
  callback: (cell: ICell) => void;
}

const PartnerCell: FC<Props> = ({cell, callback}) => {
  return (
    <div
      onClick={() => callback(cell)}
      className={`${styles.cell} ${
        cell.isShooted ? (cell.ship ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.isCanNotPlace ? styles.canNotPlace : ""
      } ${cell.ship ? styles.setted : ""}`}
    />
  );
};

export default PartnerCell;
