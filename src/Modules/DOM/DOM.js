import { battleShip } from "../Design/battleShip";
import { createElement, setDataProperties } from "./createElement";
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
    const boardCell = createElement("div", { class: domClass }, [], "");

    setDataProperties(boardCell, { coordinates: i });
  }

  return document.querySelectorAll(".preGame-boardCell");
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

const createActiveGameBoard = () => {
  const gameBoardTitleTextNode = "Where be the enemy hiding?";

  const gameBoardTitle = createElement(
    "h2",
    { class: "active-gameboard-title" },
    [],
    gameBoardTitleTextNode
  );

  const gameBoard = createElement(
    "div",
    { class: "active-battleShip-gameBoard" },
    [gameBoardTitle, createCells("activeGame-boardCell", selectionBoardSize)],
    ""
  );

  return gameBoard;
};

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

function addItemToMain(element) {
  const main = document.querySelector("main");

  main.appendChild(element);
}

function toggleActivity(elements) {
  elements.forEach((element) => {
    if (element.classList.contains("inActive")) {
      element.classList.remove("isActive");
      return;
    }
    element.classList.add("inActive");
  });
}

function revealPregameBoard() {
  const introModal = document.querySelector(".modal-container");
  const preGameBoard = document.querySelector(".selection-game-container");

  introModal.classList.add("inActive");
  preGameBoard.classList.remove("inActive");
}

function resetSelectionBoard() {
  const preGameBoard = document.querySelector(".selection-game-container");
  preGameBoard.remove();

  const newPregameBoard = createSelectionGameBoard();

  addItemToMain(newPregameBoard);

  newPregameBoard.classList.remove("inActive");
}

function startGame() {
  const preGameBoard = document.querySelector(".selection-game-container");
  const activeGameBoard = document.querySelector(
    ".active-battleShip-gameBoard"
  );

  toggleActivity([preGameBoard, activeGameBoard]);
}

function isObject(objValue) {
  return (
    objValue && typeof objValue === "object" && objValue.constructor === Object
  );
}

const applyHitCellStyles = (domCell) => {
  const hitIcon = createElement("i", { class: "fa-solid fa-burst" }, [], "");
  domCell.appendChild(hitIcon);
  domCell.classList.add("cell-hit");
};

const applyEmptyHitCellStyles = (domCell) => {
  domCell.classList.add("empty-cell-hit");
};

const applyShipPresentStyles = (domCell) => {
  const battleShip = createElement(
    "img",
    { class: "battleShip-cell-icon" },
    [],
    ""
  );
  domCell.appendChild(battleShip);
};

function applyCellStyles(cell, domCell) {
  if (isObject(cell)) {
    applyShipPresentStyles(domCell);
  }
  if (cell == -1) {
    applyEmptyHitCellStyles(domCell);
  }
  if (cell == "X") {
    applyHitCellStyles(domCell);
  }
}

function renderGameboard(gameBoard, domBoardCells) {
  gameBoard.forEach((cell, index) => {
    applyCellStyles(cell, domBoardCells[index]);
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
    player.gameBoard.isSpaciousSquare(i, currentShipLength, placementRotation);
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
  const placementManager = player.placeShipManager();
  const placementRotation = placementManager.getCurrentRotation();
  const currentShipLength = placementManager.getCurrentShip();
  const currentBattleShip = battleShip(currentShipLength);

  player.addShip(currentBattleShip, coordinates, placementRotation);

  renderGameboard(player.gameBoard, domCells);
}

function decideFinalModalTextContent(winner) {
  const finalModalTitle = document.querySelector(".game-result-modal-title");
  const finalModalDescription = document.querySelector(
    ".game-result-modal-description"
  );

  let playerIsWinner = "You win!";
  let resultDescription =
    "And your opponent reels! Keep it up, and you may become a great future admiral";

  if (winner.hasOwnProperty(makeAIhit)) {
    playerIsWinner = "You lose!";
    resultDescription =
      "Defeat? DEFEAT!?!? You better get back in the ring straight away! Lest the enemy gain an advantage...";
  }

  finalModalTitle.textContent = playerIsWinner;
  finalModalDescription.textContent = resultDescription;
}

export { createHeader };
