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
  const main_body = createElement("main", { class: "main" }, [], "");

  return main_body;
};

const createOverlay = () => {
  const overlay = createElement("div", { class: "overlay" }, [], "");

  return overlay;
};

const createIntroModal = () => {
  const descriptionTextNode = `This action packed thriller game is full of anything and everything that ww2 history nerds and board game lovers alike would enjoy. A game in which you must skillfully target your opponents warships, it truly makes even the most hardened of navy veterans hop in their seats! With everything at stake, will you be able to masterfully coordinate your fleet to defeat your enemy, or will you get your naval forces pummeled by a superier enemy, find out Now!`;
  const startGameButtonTextNode = "Start Game";

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
  const domCells = [];
  for (let i = 0; i < boardSize; i++) {
    const cellIndex = createElement("div", { class: domClass }, [], "");

    setDataProperties(cellIndex, { coordinates: i });

    domCells.push(cellIndex);
  }

  return domCells;
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

  const activeCellsContainer = createElement(
    "div",
    { class: "active-cells-container" },
    [...createCells("activeGame-boardCell")],
    ""
  );

  const gameBoard = createElement(
    "div",
    { class: classes },
    [gameBoardTitle, activeCellsContainer],
    ""
  );

  return gameBoard;
};

function createBoardConatiner() {
  const humanBoard = createActiveGameBoard(
    "And Hold!",
    "human-active-playerBoard"
  );

  const computerBoard = createActiveGameBoard(
    "Bombard!",
    "computer-active-playerBoard"
  );

  const flipper3D = createElement(
    "div",
    { class: "active-board-flipper" },
    [humanBoard, computerBoard],
    ""
  );

  const boardContainer = createElement(
    "div",
    { class: "active-board-container" },
    [flipper3D],
    ""
  );

  return boardContainer;
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

export {
  createHeader,
  createIntroModal,
  createSelectionGameContainer,
  createGameResultModal,
  createFooter,
  createActiveGameBoard,
  createMain,
  createOverlay,
  createBoardConatiner,
  createCells,
};
