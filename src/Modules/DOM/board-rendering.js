import { createElement } from "./createElement";

function isObject(objValue) {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
}

const applyAttackedCellStyles = (domCell) => {
  const hitIcon = createElement("i", { class: "fa-solid fa-burst" }, [], "");
  domCell.removeAttribute("class");
  domCell.appendChild(hitIcon);
  domCell.classList.add("cell-hit");
};

const applyEmptyHitCellStyles = (domCell) => {
  domCell.removeAttribute("class");
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

function getNeighboringSquares(cellIndex, shipGameBoard) {
  let neighboringSquares = [];

  shipGameBoard.shipLocations.forEach((shipLocation) => {
    if (shipLocation.occupiedSquares.includes(cellIndex)) {
      shipLocation.occupiedSquares.forEach((occupiedSquare) => {
        neighboringSquares.push(...shipGameBoard.get_neighbors(occupiedSquare));
      });
    }
  });

  neighboringSquares = neighboringSquares.filter(
    (square, index, array) => index == array.indexOf(square)
  );

  return neighboringSquares;
}

function getOccupiedSquares(neighboringSquares, shipGameBoard) {
  const occupied_squares = [];
  neighboringSquares.forEach((neighboringSquare) => {
    if (isObject(shipGameBoard.getItemAtCoords(neighboringSquare))) {
      occupied_squares.push(neighboringSquare);
    }
  });

  return occupied_squares;
}

const applySunkenShipStyles = (shipGameBoard, domCell) => {
  const domCellIndex = domCell.dataset.coordinates;
  const neighboringSquares = getNeighboringSquares(domCellIndex, shipGameBoard);
  const occupiedSquares = getOccupiedSquares(neighboringSquares, shipGameBoard);

  neighboringSquares.forEach((neighboringSquare) => {
    const neighboringDomCell = domCell.closest(
      `[data-coordinates=${neighboringSquare}]`
    );

    neighboringDomCell.removeAttribute("class");
    neighboringDomCell.classList.add("empty-cell-hit");
  });

  occupiedSquares.forEach((occupiedSquare) => {
    const occupiedDomCell = domCell.closest(
      `[data-coordinates=${occupiedSquare}]`
    );

    const sunkenShip = createElement(
      "img",
      {
        class: "sunken-ship-icon",
        src: "../../Assets/sink-svgrepo-com.svg",
      },
      [],
      ""
    );

    occupiedDomCell.appendChild(sunkenShip);
  });
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
  applySunkenShipStyles(gameBoard, domCell);
  applyHitCellStyles(cell, domCell);
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
    shipLocation.occupiedSquares.forEach((occupiedSquaree) => {
      board[occupiedSquaree] = {};
    });
  });

  return board;
}

function renderGameboard(Board, domBoardCells, gameBoard, boardTypeClass) {
  domBoardCells.forEach((domBoardCell) => {
    const originClass = domBoardCell.classList.value.split(" ")[0];

    domBoardCell.removeAttribute("class");
    domBoardCell.classList.add(originClass);

    domBoardCell.replaceChildren();
  });
  Board.forEach((cell, index) => {
    applyCellStyles(cell, domBoardCells[index], gameBoard);
  });
}

function renderComputerGameBoard(Board, domBoardCells, gameBoard) {
  Board.forEach((cell, index) => {
    applyNonShipCellStyles(cell, domBoardCells[index], gameBoard);
  });
}

export { translateIndeciesToBoard, renderGameboard, renderComputerGameBoard };
