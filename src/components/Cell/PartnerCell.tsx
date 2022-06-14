import {FC} from "react";
import {useAppSelector} from "../../hooks/store/useAppSelector";
import {ICell} from "../../models/Cell";
import styles from "./PartnerCell.module.scss";

interface Props {
  cell: ICell;
  callback: (cell: ICell) => void;
}

const PartnerCell: FC<Props> = ({cell, callback}) => {
  const isUserTurn = useAppSelector(({app}) => app.gameData.isUserTurn);

  return (
    <div
      onClick={() => {
        if (!cell.checked && isUserTurn) {
          callback(cell);
        }
      }}
      className={`${styles.cell} ${
        cell.checked ? (cell.isShooted ? styles.destroyed : styles.missed) : ""
      } ${cell.highlighted ? styles.selected : ""} ${
        cell.isCanNotPlace ? styles.canNotPlace : ""
      } ${cell.ship ? styles.setted : ""} ${
        cell.isCompletelyDestroyed ? styles["cell__completely__destroyed"] : ""
      }`}
    />
  );
};

export default PartnerCell;
