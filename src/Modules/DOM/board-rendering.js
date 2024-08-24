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
    if (returnCoordinatesAreShip(neighboringSquare)) {
      occupied_squares.push(neighboringSquare);
    }
  });

  return occupied_squares;
}

const getSunkenNeighborSquares = (shipGameBoard, domCell) => {
  const domCellIndex = +domCell.dataset.coordinates;
  const neighboringSquares = getNeighboringSquares(domCellIndex, shipGameBoard);
  const occupiedSquares = getOccupiedSquares(neighboringSquares, shipGameBoard);

  return { neighboringSquares, occupiedSquares };
};

const applyNeighborStyles = (domCell, neighborSquareIndex) => {
  const neighboringDomCell = domCell.closest(
    `[data-coordinates=${neighborSquareIndex}]`
  );

  neighboringDomCell.classList.add("empty-cell-hit");
};

const applyOccupiedStyles = (domCell, occupiedSquareIndex) => {
  const occupiedDomCell = domCell.closest(
    `[data-coordinates=${occupiedSquareIndex}]`
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
};

const applySunkenShipStyles = (shipGameBoard, domCell) => {
  const squaresToBeStyled = getSunkenNeighborSquares(shipGameBoard, domCell);

  squaresToBeStyled.neighboringSquares.forEach((neighboringSquare) => {
    applyNeighborStyles(domCell, neighboringSquare);
  });

  squaresToBeStyled.occupiedSquares.forEach((occupiedSquare) => {
    applyOccupiedStyles(domCell, occupiedSquare);
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
  const coordinates = +domCell.dataset.coordinates;

  if (
    gameBoard.returnCoordinatesAreShip(coordinates) &&
    gameBoard.shipIsSunken(coordinates)
  ) {
    applySunkenShipStyles(gameBoard, domCell);
    return;
  }

  if (cell == -1 || cell == "X") {
    applyHitCellStyles(cell, domCell);
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
    shipLocation.occupiedSquares.forEach((occupiedSquaree) => {
      board[occupiedSquaree] = {};
    });
  });

  return board;
}

function renderGameboard(Board, domBoardCells, gameBoard) {
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
  domBoardCells.forEach((domBoardCell) => {
    const originClass = domBoardCell.classList.value.split(" ")[0];

    domBoardCell.removeAttribute("class");
    domBoardCell.classList.add(originClass);

    domBoardCell.replaceChildren();
  });

  Board.forEach((cell, index) => {
    applyNonShipCellStyles(cell, domBoardCells[index], gameBoard);
  });
}

export { translateIndeciesToBoard, renderGameboard, renderComputerGameBoard };
