import { battleShip } from "../Design/battleShip";
import { humanPlayer, computerPlayer } from "../Design/Player";
import * as BoardRendering from "./board-rendering";

function applyHoverStyles(domCell, validPlacementSquare) {
  if (validPlacementSquare) {
    domCell.classList.add("valid-hover-placement");
    domCell.classList.remove("invalid-hover-placement");
  }

  if (!validPlacementSquare) {
    domCell.classList.add("invalid-hover-placement");
    domCell.classList.remove("valid-hover-placement");
  }
}

function alternatePlayerBoards() {
  const humanPlayerBoard = document.querySelector(".human-active-board");
  const computerPlayerBoard = document.querySelector(".computer-active-board");

  humanPlayerBoard.classList.toggle("active-board");
  computerPlayerBoard.classList.toggle("active-board");
}

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

  [...main.children].forEach((child) => {
    if (child != section && !child.classList.contains("inActive")) {
      child.classList.add("inActive");
    }
    if (child == section) {
      child.classList.remove("inActive");
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

  const humanBoard = BoardRendering.translateIndeciesToBoard([], [], []);
  const computerBoard = BoardRendering.translateIndeciesToBoard([], [], []);

  BoardRendering.renderGameboard(humanBoard, humanPlayerBoard);
  BoardRendering.renderGameboard(computerBoard, computerPlayerBoard);

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
  const shipInstructions = document.querySelector(".game-instructions-details");

  player.resetPlayerSettings();

  const board = BoardRendering.translateIndeciesToBoard(
    player.playerBoard.shipLocations,
    [],
    []
  );

  BoardRendering.renderGameboard(
    board,
    preGameBoardCells,
    player.playerBoard,
    "preGame-boardCell"
  );
  shipInstructions.textContent = `Place your ${player.placeShipManager.getCurrentShip()}x ships, Note: you can right click to toggle ship placement rotation`;
}

function startGame(player) {
  const activeGameBoard = document.querySelector(
    ".active-battleShip-gameBoard"
  );

  if (player.playerBoard.shipLocations.length == 5) {
    activateSection(activeGameBoard);
  }
}

function placeRandomShips(player) {
  const preGameBoardCells = document.querySelectorAll(".preGame-boardCell");
  const shipInstructions = document.querySelector(".game-instructions-details");

  player.resetPlayerSettings();

  player.placeShipsRandomly();
  const board = BoardRendering.translateIndeciesToBoard(
    player.playerBoard.shipLocations,
    [],
    []
  );

  BoardRendering.renderGameboard(
    board,
    preGameBoardCells,
    player.playerBoard,
    "preGame-boardCell"
  );

  shipInstructions.textContent = `Ready for battle? Press the start button with all your naval might!`;
}

function bordersEdge(squareIndex, rotation) {
  if (rotation == "Vertical" && Math.floor(squareIndex / 10) == 9) {
    return true;
  }
  if (rotation == "Horizontal" && squareIndex % 10 == 9) {
    return true;
  }
  return false;
}

function highlightShipSquares(player, startSquare, domBoardCells) {
  const placementManager = player.placeShipManager;
  const placementRotation = placementManager.getCurrentRotation();
  const currentShipLength = placementManager.getCurrentShip();
  const increment = placementRotation == "Vertical" ? 10 : 1;
  let atEdge = false;

  for (let i = 0; i < currentShipLength && !atEdge; i += 1) {
    if (bordersEdge(parseInt(startSquare) + i * increment, placementRotation)) {
      atEdge = true;
    }

    const hoveredIndex = parseInt(startSquare) + i * increment;
    const domCell = domBoardCells[hoveredIndex];

    applyHoverStyles(
      domCell,
      player.playerBoard.isSpaciousSquare(
        startSquare,
        currentShipLength,
        placementRotation
      )
    );
  }
}

function placePlayerShip(player, coordinates, domCells) {
  if (player.playerBoard.shipLocations.length == 5) {
    return;
  }

  const selectionInstructions = document.querySelector(
    ".game-instructions-details"
  );

  const placementManager = player.placeShipManager;
  const placementRotation = placementManager.getCurrentRotation();
  const currentShipLength = placementManager.getCurrentShip();
  const currentBattleShip = battleShip(currentShipLength);
  const shipAmount = player.playerBoard.shipLocations.length;
  const spaciousSquare = player.playerBoard.isSpaciousSquare(
    coordinates,
    currentShipLength,
    placementRotation
  );

  if (spaciousSquare) {
    player.addShip(currentBattleShip, coordinates, placementRotation);
  }

  const board = BoardRendering.translateIndeciesToBoard(
    player.playerBoard.shipLocations,
    [],
    []
  );

  if (shipAmount != player.playerBoard.shipLocations.length) {
    BoardRendering.renderGameboard(
      board,
      domCells,
      player.playerBoard,
      "preGame-boardCell"
    );
  }

  highlightShipSquares(player, coordinates, domCells);

  let selectionInstructionsText = `Place your ${placementManager.getCurrentShip()}x ships, Note: you can right click to toggle ship placement rotation`;

  if (placementManager.getCurrentShip() == undefined) {
    selectionInstructionsText = `Ready for battle? Make sure to press the start button!`;
  }
  selectionInstructions.textContent = selectionInstructionsText;
}

function attackCell(attackedPlayer, coordinates, domCells) {
  attackedPlayer.playerBoard.receiveHit(coordinates);
  const computerBoard = BoardRendering.translateIndeciesToBoard(
    attackedPlayer.shipLocations,
    [],
    []
  );

  BoardRendering.renderComputerGameBoard(
    computerBoard,
    domCells,
    attackedPlayer.playerBoard,
    "activeGame-boardCell"
  );

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
  const introModal = document.querySelector(".modal-container");
  const selectionGameboard = document.querySelector(
    ".selection-battleShip-gameBoard"
  );

  activateSection(introModal);

  selectionGameboard.addEventListener(
    "contextmenu",
    (event) => {
      event.preventDefault();

      const shipPlacementCoordinates =
        event.target.closest(".preGame-boardCell").dataset.coordinates;

      selectionCells.forEach((selectionCell) => {
        selectionCell.classList.remove("invalid-hover-placement");
        selectionCell.classList.remove("valid-hover-placement");
      });

      humanPlayer.placeShipManager.toggleRotation();

      highlightShipSquares(
        humanPlayer,
        shipPlacementCoordinates,
        selectionCells
      );

      return false;
    },
    false
  );
  startSelection.addEventListener("click", revealPregameBoard);

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
      const shipPlacementCoordinates =
        event.target.closest(".preGame-boardCell").dataset.coordinates;
      highlightShipSquares(
        humanPlayer,
        shipPlacementCoordinates,
        selectionCells
      );
    });
    selectionCell.addEventListener("mouseleave", () => {
      selectionCells.forEach((selectionCell) => {
        selectionCell.classList.remove("invalid-hover-placement");
        selectionCell.classList.remove("valid-hover-placement");
      });
    });
  });

  playAgainButton.addEventListener("click", () => {
    playAgain();
  });
  mainMenu.addEventListener("click", () => {
    revealStartSection();
  });
});
