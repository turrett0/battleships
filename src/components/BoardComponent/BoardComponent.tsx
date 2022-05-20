import {FC, Fragment, useState} from "react";
import {Board, roles} from "../../models/Board";
import {Cell} from "../../models/Cell";
import {Ship} from "../../models/Ship";
import {debounce} from "../../utils/debounce";
import CellComponent from "../CellComponent/CellComponent";
import styles from "./BoardComponent.module.scss";

interface Props {
  board: Board;
  setBoard: (board: Board) => void;
}
const BoardComponent: FC<Props> = ({board, setBoard}) => {
  const [currentCell, setCurrenCell] = useState<Cell | null>(null);
  const onClickHandler = (target: Cell) => {
    // if (board.isControlable) {
    target.isShooted = true;
    console.log(target);
    updateBoard();
    // }
  };

  const onDragShipHandler = debounce((target: Cell, ship: Ship) => {
    console.log("d"); //unoptimized!
    board.findHighlightCells(target, ship);
    updateBoard();
  }, 1000);

  function updateBoard() {
    const {role, username, isControlable} = board;
    const newBoard = board.getCopyBoard(username, role, isControlable);
    setBoard(newBoard);
  }

  return (
    <div className={styles.container}>
      <span>
        {board.role === roles.USER
          ? "Моя Доска"
          : `Доска пользователя ${board.username}`}
      </span>
      <div className={styles.board}>
        {board.cells.map((row, index) => (
          <Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                cell={cell}
                onClickHandler={onClickHandler}
                onDragShipHandler={onDragShipHandler}
                updateBoard={updateBoard}
                key={cell.id}
              />
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
