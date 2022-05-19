import {FC, Fragment} from "react";
import {Board} from "../../models/Board";
import CellComponent from "../CellComponent/CellComponent";
import styles from "./BoardComponent.module.scss";

interface Props {
  board: Board;
}
const BoardComponent: FC<Props> = ({board}) => {
  console.log(board);
  return (
    <div className={styles.board}>
      {board.cells.map((row, index) => (
        <Fragment key={index}>
          {row.map((cell) => (
            <CellComponent cell={cell} key={cell.id} />
          ))}
        </Fragment>
      ))}
    </div>
  );
};

export default BoardComponent;
