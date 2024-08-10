import * as DOM from "./Modules/DOM/DOM-setup";
import "./Modules/DOM/DOM";
import "./Styles/main.css";

const body = document.body;

const header = DOM.createHeader();
const introModal = DOM.createIntroModal();
const selectionGameContainer = DOM.createSelectionGameContainer();
const gameResultModal = DOM.createGameResultModal();
const footer = DOM.createFooter();

const humanActiveGameBoard = DOM.createActiveGameBoard(
  "Fire!",
  "human-active-playerBoard"
);
const computerActiveGameBoard = DOM.createActiveGameBoard(
  "And hold!",
  "computer-active-playerBoard"
);

const main = DOM.createMain();

main.appendChild(introModal);
main.appendChild(selectionGameContainer);
main.appendChild(humanActiveGameBoard);
main.appendChild(computerActiveGameBoard);
main.appendChild(gameResultModal);

body.appendChild(header);
body.appendChild(main);
body.appendChild(footer);
