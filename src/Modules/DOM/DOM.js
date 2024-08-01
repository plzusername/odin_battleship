import { battleShip } from "../Design/battleShip";
import { createElement, setDataProperties } from "./createElement";
import { humanPlayer, computerPlayer } from "../Design/Player";
import "@fortawesome/fontawesome-free/js/all.js";

const createHeader = () => {
  const logo = createLogo();
  const header = createElement(
    "header",
    { class: "header-container" },
    [logo],
    ""
  );

  return header;
};

const createLogo = () => {
  const logoTitleTextNode = "BATTLESHIP";

  const logoIcon = createElement(
    "i",
    { class: "fa-solid fa-ship logi-icon" },
    [],
    ""
  );
  const logoText = createElement(
    "h2",
    { class: "logo-title" },
    [],
    logoTitleTextNode
  );

  const logo = createElement(
    "div",
    { class: "logo-container" },
    [logoIcon, logoText],
    ""
  );

  return logo;
};

const createMain = () => {
  const main_body = createElement("main", { class: "main-container" }, [], "");

  return main_body;
};

const createIntroModal = () => {
  const descriptionTextNode = `This action packed thriller game is full of anything and everything that ww2 history nerds and board game lovers alike would enjoy. A game in which you must skillfully target your opponents warships, it truly makes even the most hardened of navy veterans hop in their seats! With everything at stake, will you be able to masterfully coordinate your fleet to defeat your enemy, or will you get your naval forces pummeled by a superier enemy, find out Now!`;
  const startGameButtonTextNode = "Start";

  const modalPreviewImage = createIntroModalPreview();
  const gameDescription = createElement(
    "p",
    { class: "game-description" },
    [],
    descriptionTextNode
  );

  const startGameButton = createElement(
    "button",
    { class: "start-game-button" },
    [],
    startGameButtonTextNode
  );

  const modal = createElement(
    "div",
    { class: "modal-container" },
    [modalPreviewImage, gameDescription, startGameButton],
    ""
  );

  return modal;
};

const createFooter = () => {
  const githubNameTextNode = "MOFRIS";

  const githubIcon = createElement(
    "i",
    { class: "fa-brands fa-github github-icon" },
    [],
    ""
  );
  const gtihubName = createElement(
    "p",
    { class: "github-name" },
    [],
    githubNameTextNode
  );

  const linkSection = createElement(
    "a",
    { class: "github-link-section", href: "https://github.com/plzusername" },
    [githubIcon, gtihubName],
    ""
  );

  //visit my github pls (:

  const footerSection = createElement(
    "footer",
    { class: "footer-section" },
    [linkSection],
    ""
  );

  return footerSection;
};

const createIntroModalPreview = () => {
  const previewHeaderTextNode = "BATTLESHIP";
  const previewCaptionTextNode = "The classic naval board game";

  const previewHeader = createElement(
    "h1",
    { class: "preview-header" },
    [],
    previewHeaderTextNode
  );
  const previewCaption = createElement(
    "p",
    { class: "preview-caption" },
    [],
    previewCaptionTextNode
  );

  const previewImage = createElement(
    "div",
    { class: "preview-image-container" },
    [previewHeader, previewCaption],
    ""
  );

  return previewImage;
};

const createSelectionGameContainer = (selectionBoardSize) => {
  const selectionGameContainer = createElement(
    "div",
    { class: "selection-game-container" },
    [
      createGameInstructions(),
      createSelectionGameBoard(selectionBoardSize),
      createSelectionButtonsSection(),
    ],
    ""
  );

  return selectionGameContainer;
};

const createGameInstructions = () => {
  const gameInstructionsHeaderTextNode = "Fleet into position!";
  const gameInstructionsDetailsTextNode =
    "Place your 5x ships, Note: you can right click to toggle ship placement rotation";

  const gameInstructionsHeader = createElement(
    "h1",
    { class: "game-instructions-header" },
    [],
    gameInstructionsHeaderTextNode
  );

  const gameInstructionsDetails = createElement(
    "p",
    { class: "game-instructions-details" },
    [],
    gameInstructionsDetailsTextNode
  );

  const gameInstructions = createElement(
    "div",
    { class: "game-instructions" },
    [gameInstructionsHeader, gameInstructionsDetails],
    ""
  );

  return gameInstructions;
};

const createSelectionGameBoard = (selectionBoardSize) => {
  const gameBoard = createElement(
    "div",
    { class: "selection-battleShip-gameBoard" },
    createCells("preGame-boardCell", selectionBoardSize),
    ""
  );

  return gameBoard;
};

const createCells = (domClass, boardSize = 100) => {
  for (let i = 0; i < boardSize; i++) {
    const cellIndex = createElement("div", { class: domClass }, [], "");

    setDataProperties(cellIndex, { coordinates: i });
  }

  return document.querySelectorAll(domClass);
};

const createSelectionButtonsSection = () => {
  const randomButton = createElement(
    "button",
    { class: "random-selection-board-button" },
    [],
    "Random"
  );
  const startGameButton = createElement(
    "button",
    { class: "start-Game-selection-board-button" },
    [],
    "Start Game"
  );
  const resetButton = createElement(
    "button",
    { class: "reset-selection-board-button" },
    [],
    "Reset"
  );

  const selectionButtonsSection = createElement(
    "div",
    { class: "buttons-selection-section" },
    [randomButton, startGameButton, resetButton],
    ""
  );

  return selectionButtonsSection;
};

const createActiveGameBoard = (titleText, classes) => {
  const gameBoardTitleTextNode = titleText;

  const gameBoardTitle = createElement(
    "h2",
    { class: "active-gameboard-title" },
    [],
    gameBoardTitleTextNode
  );

  const gameBoard = createElement(
    "div",
    { class: classes },
    [gameBoardTitle, ...createCells("activeGame-boardCell")],
    ""
  );

  return gameBoard;
};

function alternatePlayerBoards() {
  const humanPlayerBoard = document.querySelector(".human-active-board");
  const computerPlayerBoard = document.querySelector(".computer-active-board");

  humanPlayerBoard.classList.toggle("active-board");
  computerPlayerBoard.classList.toggle("active-board");
}

const createGameResultModal = () => {
  const gameResultTitleTextNode = "You win!";
  const gameResultDescriptionTextNode =
    "And your opponent reels! Keep it up, and you may become a great future admiral!";

  const gameResultTitle = createElement(
    "h2",
    { class: "game-result-modal-title" },
    [],
    gameResultTitleTextNode
  );

  const gameResultDescription = createElement(
    "p",
    { class: "game-result-modal-description" },
    [],
    gameResultDescriptionTextNode
  );

  const mainMenuButton = createElement(
    "button",
    { class: "main-menu-button-modal" },
    [],
    "Main Menu"
  );
  const playAgainButton = createElement(
    "button",
    { class: "play-again-button-modal" },
    [],
    "Play-again"
  );

  const buttonsContainer = createElement(
    "div",
    { class: "game-result-modal-buttons-container" },
    [playAgainButton, mainMenuButton],
    ""
  );

  const gameResultModal = createElement(
    "div",
    { class: "game-result-modal" },
    [gameResultTitle, gameResultDescription, buttonsContainer],
    ""
  );

  return gameResultModal;
};

function toggleOverlayVisibility() {
  const overlay = document.querySelector(".overlay");

  overlay.classList.toggle("overlay-activity");
}

function revealFinalResultModal() {
  const finalResultModal = document.querySelector(".game-result-modal");

  activateSection(finalResultModal);
  toggleOverlayVisibility();
}

function activateSection(section) {
  const main = document.querySelector(".main");

  main.children.forEach((child) => {
    child.classList.toggle("inActive");
    if (child != section) {
      child.classList.toggle("inActive");
    }
  });
}

function restartPlayerSettings() {
  humanPlayer.resetPlayerSettings();
  computerPlayer.resetPlayerSettings();
}

function revealStartSection() {
  const startSection = document.querySelector(".modal-container");

  activateSection(startSection);
  restartPlayerSettings();
  toggleOverlayVisibility();
}

function playAgain() {
  const humanPlayerBoard = document.querySelector(".human-player-board");
  const computerPlayerBoard = document.querySelector(".computer-player-board");

  const humanBoard = translateIndeciesToBoard([], [], []);
  const computerBoard = translateIndeciesToBoard([], [], []);

  renderGameboard(humanBoard, humanPlayerBoard);
  renderGameboard(computerBoard, computerPlayerBoard);

  revealPregameBoard();
  restartPlayerSettings();
  toggleOverlayVisibility();
}

function revealPregameBoard() {
  const preGameBoard = document.querySelector(".selection-game-container");

  activateSection(preGameBoard);
}

function resetSelectionBoard(player) {
  const preGameBoardCells = document.querySelectorAll(".preGame-boardCell");

  player.gameBoard.shipLocations = [];

  const board = translateIndeciesToBoard(
    player.gameBoard.shipLocations,
    [],
    []
  );

  renderGameboard(board, preGameBoardCells);
}

function startGame(player) {
  const activeGameBoard = document.querySelector(
    ".active-battleShip-gameBoard"
  );

  if (player.gameBoard.shipLocations.length == 5) {
    activateSection(activeGameBoard);
  }
}

function placeRandomShips(player) {
  const preGameBoardCells = document.querySelectorAll(".preGame-boardCell");

  player.placeShipsRandomly();
  const board = translateIndeciesToBoard(player.gameBoard.shipLocations);

  renderGameboard(board, preGameBoardCells);
}

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
      class: "battleShip-cell-icon",
      src: "../../Assets/ship-svgrepo-computerPlayer.svg",
    },
    [],
    ""
  );
  domCell.appendChild(battleShip);
};

function getNeighboringSquares(cellIndex, shipGameBoard) {
  const neighboringSquares = [];

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

function applyNonShipCellStyles(cell, domCell, gameBoard) {
  applySunkenShipStyles(gameBoard, domCell);
  applyHitCellStyles(cell, domCell);
}

function applyCellStyles(cell, domCell, gameBoard) {
  if (isObject(cell)) {
    applyShipPresentStyles(domCell);
  }
  applySunkenShipStyles(gameBoard, domCell);
  applyNonShipCellStyles(cell, domCell);
}

function applyHitCellStyles(cell, domCell) {
  if (cell == -1) {
    applyEmptyHitCellStyles(domCell);
  }
  if (cell == "X") {
    applyAttackedCellStyles(domCell);
  }
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
  Board.forEach((cell, index) => {
    applyCellStyles(cell, domBoardCells[index], gameBoard);
  });
}

function renderComputerGameBoard(Board, domBoardCells, gameBoard) {
  Board.forEach((cell, index) => {
    applyNonShipCellStyles(cell, domBoardCells[index], gameBoard);
  });
}

function applyHoverStyles(domCell, spaciousSquare) {
  domCell.classList.add("valid-ship-square");

  if (!spaciousSquare) {
    domCell.classList.add("overlap-ship-square");
    domCell.classList.remove("valid-ship-square");
  }
}

function highlightShipSquares(player, startSquare, domBoardCells) {
  const placementManager = player.placeShipManager();
  const placementRotation = placementManager.getCurrentRotation();
  const currentShipLength = placementManager.getCurrentShip();
  const increment = placementRotation == "Vertical" ? 10 : 1;

  for (
    let i = startSquare;
    i < currentShipLength &&
    player.gameBoard.isSpaciousSquare(
      startSquare,
      currentShipLength,
      placementRotation
    );
    i += increment
  ) {
    const domCell = domBoardCells[i];

    applyHoverStyles(
      domCell,
      player.gameBoard.isSpaciousSquare(i, currentShipLength, placementRotation)
    );
  }
}

function placePlayerShip(player, coordinates, domCells) {
  const selectionInstructions = document.querySelector(
    ".game-instructions-details"
  );

  const placementManager = player.placeShipManager();
  const placementRotation = placementManager.getCurrentRotation();
  const currentShipLength = placementManager.getCurrentShip();
  const currentBattleShip = battleShip(currentShipLength);
  const board = translateIndeciesToBoard(player.gameBoard.shipLocations);

  player.addShip(currentBattleShip, coordinates, placementRotation);

  renderGameboard(board, domCells);

  const selectionInstructionsText = `Place your ${currentShipLength} ships, Note: you can right click to toggle ship placement rotation`;
  selectionInstructions.textContent = selectionInstructionsText;
}

function attackCell(attackedPlayer, coordinates, domCells) {
  attackedPlayer.playerBoard.receiveHit(coordinates);
  const computerBoard = translateIndeciesToBoard(attackedPlayer.shipLocations);

  renderComputerGameBoard(computerBoard, domCells);

  if (
    humanPlayer.playerBoard.locations.length == 0 ||
    computerPlayer.playerBoard.locations.length == 0
  ) {
    decideFinalModalTextContent(
      humanPlayer.isWinner() ? humanPlayer : computerPlayer
    );
    revealFinalResultModal();
  }
  alternatePlayerBoards();
}

function decideFinalModalTextContent(winner) {
  const finalModalTitle = document.querySelector(".game-result-modal-title");
  const finalModalDescription = document.querySelector(
    ".game-result-modal-description"
  );

  let playerIsWinner = "You win!";
  let resultDescription =
    "And your opponent reels! Keep it up, at this pace, you may just become a great future admiral for the nation!";

  if (winner.hasOwnProperty(makeAIhit)) {
    playerIsWinner = "You lose!";
    resultDescription =
      "Defeat? DEFEAT!?!? You better get back in the ring straight away! Lest the enemy navy gain a strategic advantage...";
  }

  finalModalTitle.textContent = playerIsWinner;
  finalModalDescription.textContent = resultDescription;
}

document.addEventListener("DOMContentLoaded", () => {
  const startSelection = document.querySelector(".start-game-button");
  const preGameDomCells = document.querySelectorAll(".preGame-boardCell");
  const randomShipButton = document.querySelector(
    ".random-selection-board-button"
  );
  const startButton = document.querySelector(
    ".start-Game-selection-board-button"
  );
  const resetSelection = document.querySelector(
    ".reset-selection-board-button"
  );
  const selectionCells = document.querySelectorAll(
    ".selection-battleShip-gameBoard > .preGame-boardCell"
  );
  const computerPlayerBoardCells = document.querySelectorAll(
    ".computer-active-playerBoard > .activeGame-boardCell"
  );
  const playAgainButton = document.querySelector(".play-again-button-modal");
  const mainMenu = document.querySelector(".main-menu-button-modal");

  startSelection.addEventListener("click", revealPregameBoard);

  preGameDomCells.forEach((preGameDomCell) => {
    preGameDomCell.addEventListener("click", placePlayerShip);
  });

  randomShipButton.addEventListener("click", () => {
    placeRandomShips(humanPlayer);
  });
  startButton.addEventListener("click", () => {
    startGame(humanPlayer);
  });

  resetSelection.addEventListener("click", () => {
    resetSelectionBoard(humanPlayer);
  });

  computerPlayerBoardCells.forEach((computerPlayerBoardCell) => {
    computerPlayerBoardCell.addEventListener("click", (event) => {
      const shipPlacementCoordinates = event.target.dataset.coordinates;
      attackCell(
        computerPlayer,
        shipPlacementCoordinates,
        computerPlayerBoardCells
      );
    });
  });

  selectionCells.forEach((selectionCell) => {
    selectionCell.addEventListener("click", (event) => {
      const shipPlacementCoordinates = event.target.dataset.coordinates;
      placePlayerShip(humanPlayer, shipPlacementCoordinates, selectionCells);
    });
    selectionCell.addEventListener("mouseover", (event) => {
      const shipPlacementCoordinates = event.target.dataset.coordinates;
      highlightShipSquares(
        humanPlayer,
        shipPlacementCoordinates,
        selectionCells
      );
    });
  });

  playAgainButton.addEventListener("click", () => {
    playAgain();
  });
  mainMenu.addEventListener("click", () => {
    revealStartSection();
  });
});
export {
  createHeader,
  createIntroModal,
  createSelectionGameContainer,
  createActiveGameBoard,
  createGameResultModal,
  createMain,
  createFooter,
};
