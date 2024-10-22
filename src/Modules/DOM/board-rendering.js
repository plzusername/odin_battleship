import { createElement } from "./createElement";

function isObject(objValue) {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
}

const applyAttackedCellStyles = (domCell) => {
  const hitIcon = createElement(
    "img",
    { class: "fa-solid fa-certificate hit-ship" },
    [],
    ""
  );
  domCell.removeAttribute("class");
  domCell.classList.add("activeGame-boardCell");
  domCell.appendChild(hitIcon);
  domCell.classList.add("cell-hit");
};

const applyEmptyHitCellStyles = (domCell) => {
  domCell.classList.add("empty-cell-hit");
};

const applyShipPresentStyles = (domCell) => {
  const battleShip = createElement(
    "img",
    {
      class: "fa-solid fa-ship",
    },
    [],
    ""
  );
  domCell.appendChild(battleShip);
};

function applyHitCellStyles(cell, domCell) {
  if (cell == -1) {
    applyEmptyHitCellStyles(domCell);
  }
  if (cell == "X") {
    applyAttackedCellStyles(domCell);
  }
}

function applyNonShipCellStyles(cell, domCell, gameBoard) {
  const coordinates = +domCell.dataset.coordinates;

  if (
    isObject(gameBoard.returnPreviousShipAtCoords(coordinates)) &&
    gameBoard.shipIsSunken(coordinates)
  ) {
    applyOccupiedStyles(domCell);
    return;
  }

  if (cell == -1 || cell == "X") {
    applyHitCellStyles(cell, domCell);
    return;
  }
}

function applyCellStyles(cell, domCell, gameBoard) {
  if (isObject(cell)) {
    applyShipPresentStyles(domCell);
    return;
  }

  applyNonShipCellStyles(cell, domCell, gameBoard);
}

function translateIndeciesToBoard(shipLocations, hitSquares, missSquares) {
  const board = new Array(100).fill(0);

  hitSquares.forEach((hitSquare) => {
    board[hitSquare] = "X";
  });
  missSquares.forEach((missSquare) => {
    board[missSquare] = -1;
  });

  shipLocations.forEach((shipLocation) => {
    shipLocation.occupiedSquares.forEach((occupiedSquare) => {
      board[occupiedSquare] = {};
    });
  });

  return board;
}

function resetCell(domBoardCell) {
  const originClass = domBoardCell.classList.value.split(" ")[0];

  domBoardCell.removeAttribute("class");
  domBoardCell.classList.add(originClass);

  domBoardCell.replaceChildren();
}

function renderGameboard(Board, domBoardCells, gameBoard) {
  Board.forEach((cell, index) => {
    const domCell = domBoardCells[index];

    resetCell(domCell);
    applyCellStyles(cell, domCell, gameBoard);
  });
}

function renderComputerGameBoard(Board, domBoardCells, gameBoard) {
  Board.forEach((cell, index) => {
    const domCell = domBoardCells[index];

    resetCell(domCell);
    applyNonShipCellStyles(cell, domCell, gameBoard);
  });
}

export { translateIndeciesToBoard, renderGameboard, renderComputerGameBoard };
