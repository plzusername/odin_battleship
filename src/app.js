import * as DOM from "./Modules/DOM/DOM-setup";
import "./Modules/DOM/DOM";
import "./Styles/main.css";

const body = document.body;

const introModal = DOM.createIntroModal();
const selectionGameContainer = DOM.createSelectionGameContainer();
const activeBoardContainer = DOM.createBoardConatiner();
const gameResultModal = DOM.createGameResultModal();

const header = DOM.createHeader();
const main = DOM.createMain();
const footer = DOM.createFooter();

const overlay = DOM.createOverlay();

main.appendChild(introModal);
main.appendChild(selectionGameContainer);
main.appendChild(activeBoardContainer);
main.appendChild(gameResultModal);

body.appendChild(header);
body.appendChild(main);
body.appendChild(footer);
body.appendChild(overlay);
