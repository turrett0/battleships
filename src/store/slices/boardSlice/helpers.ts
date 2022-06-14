import {IBoard} from "../../../models/Board";
import {ICell} from "../../../models/Cell";
import {IShip} from "../../../models/Ship";

export const getValidCoords = (cell: ICell, draggingElement: IShip) => {
  let x = cell.x ?? (draggingElement.coords?.startX as number);
  let y = cell.y ?? (draggingElement.coords?.startY as number);
  let endX = x + draggingElement.health - 1;
  let endY = y + draggingElement.health - 1;
  if (endY > 9) {
    endY = 9;
  }
  if (endX > 9) {
    endX = 9;
  }

  const currentAxis =
    !draggingElement.coords ||
    draggingElement.coords?.startX !== draggingElement.coords?.endX;
  const currentAxisStart = currentAxis ? x : y;
  const currentAxisEnd = currentAxis ? endX : endY;
  const secondAxisStart = currentAxis ? y : x;
  const secondAxisEnd = currentAxis ? endY : endX;

  return {
    currentAxis,
    currentAxisStart,
    currentAxisEnd,
    secondAxisStart,
    secondAxisEnd,
    x,
    y,
    endX,
    endY,
  };
};

export const isCanPlace = (
  board: IBoard,
  x: number,
  y: number,
  ship: IShip
): boolean => {
  const {currentAxis} = getValidCoords(board.cells[y][x], ship);
  let lastIndex = x + ship.health;
  let lastVerticalIndex = y + ship.health > 9 ? 9 : y + ship.health;

  if (
    ship.coords &&
    ship.coords.startX === ship.coords.endX &&
    y + ship.health - 1 > 9
  )
    return false;
  if (!ship.coords && x + ship.health - 1 > 9) return false;
  if (
    ship.coords &&
    ship.coords.startX !== ship.coords.endX &&
    x + ship.health - 1 > 9
  )
    return false;

  if (lastIndex > 9) {
    lastIndex = 9;
  }
  if (currentAxis) {
    for (let index = x - 1 < 0 ? 0 : x - 1; index <= lastIndex; index++) {
      if (
        board.cells[y][index].ship ||
        board.cells[y - 1 < 0 ? 0 : y - 1][index].ship ||
        board.cells[y + 1 > 9 ? 9 : y + 1][index].ship
      ) {
        return false;
        //pass
      }
    }
  } else {
    for (let index = y <= 0 ? 0 : y - 1; index <= lastVerticalIndex; index++) {
      if (
        board.cells[index][x].ship ||
        board.cells[index][x - 1 < 0 ? 0 : x - 1].ship ||
        board.cells[index][x + 1 > 9 ? 9 : x + 1].ship ||
        board.cells[lastVerticalIndex][x].ship ||
        board.cells[lastVerticalIndex > 9 ? 9 : lastVerticalIndex][
          x + 1 > 9 ? 9 : x + 1
        ].ship
      ) {
        return false;
      }
    }
  }

  return true;
};

export const isCanRotate = (
  x: number,
  y: number,
  currentShip: IShip,
  coords: any,
  boardCells: IBoard["cells"],
  xAxis: number,
  yAxis: number
): boolean => {
  if (y + currentShip.health > 10 || x + currentShip.health > 10) {
    return false;
  }
  for (let index = y; index <= yAxis; index++) {
    if (
      (boardCells[index][x]?.ship ||
        boardCells[index][x + 1 > 9 ? 9 : x + 1].ship ||
        boardCells[coords.endY + 1][x].ship ||
        boardCells[coords.endY + 1][x + 1].ship ||
        boardCells[coords.endY + 1][x - 1 < 0 ? 0 : x - 1].ship ||
        boardCells[index][x - 1 < 0 ? 0 : x - 1].ship) &&
      boardCells[index][x].ship?.id !== currentShip.id
    ) {
      return false;
    }
  }
  for (let index = x; index <= xAxis; index++) {
    if (
      (boardCells[y][index].ship ||
        boardCells[y + 1 > 9 ? 9 : y + 1][index].ship ||
        boardCells[y - 1 < 0 ? 0 : y - 1][index].ship) &&
      boardCells[y][index].ship?.id !== currentShip.id
    ) {
      return false;
    }
  }

  return true;
};
