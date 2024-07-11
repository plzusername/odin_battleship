import { createElement, setDataProperties } from "./createElement";

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
  const logoTitleTextNode = document.createTextNode("");

  const logoIcon = createElement(
    "i",
    { class: "fa-solid fa-ship logi-icon" },
    [],
    ""
  );
  const logoText = createElement(
    "h2",
    { class: "logo-icon" },
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
  const descriptionTextNode = document.createTextNode("");
  const startGameButtonTextNode = document.createTextNode("");

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
  const githubNameTextNode = document.createTextNode("");

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
  const previewHeaderTextNode = document.createTextNode("");
  const previewCaptionTextNode = document.createTextNode("");

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
    [createGameInstructions(), createSelectionGameBoard(selectionBoardSize)],
    ""
  );

  return selectionGameContainer;
};

const createGameInstructions = () => {
  const gameInstructionsHeaderTextNode = document.createTextNode("");
  const gameInstructionsDetailsTextNoce = document.createTextNode("");

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
    gameInstructionsDetailsTextNoce
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
    createCells(selectionBoardSize),
    ""
  );

  return gameBoard;
};

const createCells = (boardSize = 100) => {
  for (let i = 0; i < boardSize; i++) {
    const boardCell = createElement(
      "div",
      { class: "preGame-boardCell" },
      [],
      ""
    );

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
