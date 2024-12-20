import { battleShip } from "../Design/battleShip";
import { humanPlayer, computerPlayer } from "../Design/Player";
import * as BoardRendering from "./board-rendering";

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

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

function renderBoards() {
  const humanGameBoardCells = document.querySelectorAll(
    ".human-active-playerBoard .active-cells-container > *"
  );
  const humanSelectionCells = document.querySelectorAll(
    ".selection-battleShip-gameBoard > *"
  );
  const computerGameBoardCells = document.querySelectorAll(
    ".computer-active-playerBoard .active-cells-container > *"
  );

  const humanGameBoard = humanPlayer.playerBoard;
  const computerGameBoard = computerPlayer.playerBoard;

  const humanBoard = BoardRendering.translateIndeciesToBoard(
    humanGameBoard.shipLocations,
    humanGameBoard.hitSquares,
    humanGameBoard.missedSquares
  );
  const computerBoard = BoardRendering.translateIndeciesToBoard(
    computerGameBoard.shipLocations,
    computerGameBoard.hitSquares,
    computerGameBoard.missedSquares
  );

  BoardRendering.renderGameboard(
    humanBoard,
    humanSelectionCells,
    humanGameBoard
  );
  BoardRendering.renderGameboard(
    humanBoard,
    humanGameBoardCells,
    humanGameBoard
  );

  BoardRendering.renderComputerGameBoard(
    computerBoard,
    computerGameBoardCells,
    computerGameBoard
  );
}

function resetInstructionsText() {
  const instructionText = document.querySelector(".game-instructions-details");

  instructionText.textContent =
    "Place your 5x ships, Note: you can right click to toggle ship placement rotation";
}

function revealStartSection() {
  const startSection = document.querySelector(".modal-container");

  activateSection(startSection);
  toggleOverlayVisibility();

  restartPlayerSettings();
  renderBoards();

  resetInstructionsText();
}

function playAgain() {
  revealPregameBoard();
  toggleOverlayVisibility();

  restartPlayerSettings();
  renderBoards();

  resetInstructionsText();
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
  const activeGameBoard = document.querySelector(".active-board-container");
  const humanCells = document.querySelectorAll(
    ".human-active-playerBoard .activeGame-boardCell"
  );

  if (player.playerBoard.shipLocations.length == 5) {
    const humanBoard = BoardRendering.translateIndeciesToBoard(
      humanPlayer.playerBoard.shipLocations,
      [],
      []
    );
    computerPlayer.placeShipsRandomly();
    // computerPlayer.addShip(battleShip(1), 0, "Vertical");

    activateSection(activeGameBoard);
    BoardRendering.renderGameboard(
      humanBoard,
      humanCells,
      humanPlayer.playerBoard
    );
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

  BoardRendering.renderGameboard(board, preGameBoardCells, player.playerBoard);

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
    if (bordersEdge(startSquare + i * increment, placementRotation)) {
      atEdge = true;
    }

    const hoveredIndex = startSquare + i * increment;
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
  console.log("Placed");
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
    selectionInstructionsText = `Ready for battle? Press the start button with all your naval might!`;
  }
  selectionInstructions.textContent = selectionInstructionsText;
}

function checkForWinner() {
  const necessary_destroyed_ships = 5;

  const destroyed_human_ships = humanPlayer.playerBoard.shipLocations.filter(
    (shipLocation) => shipLocation.occupiedSquares.length == 0
  );
  const destroyed_computer_ships =
    computerPlayer.playerBoard.shipLocations.filter(
      (shipLocation) => shipLocation.occupiedSquares.length == 0
    );

  return (
    destroyed_human_ships.length === necessary_destroyed_ships ||
    destroyed_computer_ships.length === necessary_destroyed_ships
  );
}

function revealFinalModal() {
  decideFinalModalTextContent(
    humanPlayer.isWinner(computerPlayer) ? humanPlayer : computerPlayer
  );
  revealFinalResultModal();
}

function humanAttack(attackedPlayer, coordinates, domCells) {
  attackedPlayer.playerBoard.receiveHit(coordinates);

  const computerBoard = BoardRendering.translateIndeciesToBoard(
    attackedPlayer.playerBoard.shipLocations,
    attackedPlayer.playerBoard.hitSquares,
    attackedPlayer.playerBoard.missedSquares
  );

  BoardRendering.renderComputerGameBoard(
    computerBoard,
    domCells,
    attackedPlayer.playerBoard
  );

  if (checkForWinner()) {
    revealFinalModal();
  }
}
function computerAttack(targetPlayer, domCells) {
  computerPlayer.makeComputerHit(targetPlayer.playerBoard);

  const humanBoard = BoardRendering.translateIndeciesToBoard(
    targetPlayer.playerBoard.shipLocations,
    targetPlayer.playerBoard.hitSquares,
    targetPlayer.playerBoard.missedSquares
  );

  BoardRendering.renderGameboard(
    humanBoard,
    domCells,
    targetPlayer.playerBoard
  );

  if (checkForWinner()) {
    revealFinalModal();
  }
}

function decideFinalModalTextContent(winner) {
  const finalModalTitle = document.querySelector(".game-result-modal-title");
  const finalModalDescription = document.querySelector(
    ".game-result-modal-description"
  );

  let playerIsWinner = "You win!";
  let resultDescription =
    "And your opponent reels! Keep it up, at this pace, you may just become a great future admiral for the nation!";

  if (winner.hasOwnProperty("makeAIhit")) {
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
    ".computer-active-playerBoard  .activeGame-boardCell"
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
        +event.target.closest(".preGame-boardCell").dataset.coordinates;

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
    computerPlayerBoardCell.addEventListener("click", async (event) => {
      const shipAttackCoordinates = +event.target.dataset.coordinates;

      if (event.currentTarget != event.target) {
        return;
      }
      if (
        computerPlayer.playerBoard.validHit(shipAttackCoordinates) ==
        "Invalid hit"
      ) {
        return;
      }

      // Seperation of Identical IF statement results for better visualisation of logical flow
      const boardsContainer = document.querySelector(".active-board-container");
      const computerBoardCells = document.querySelectorAll(
        ".computer-active-playerBoard  .activeGame-boardCell"
      );
      const humanBoardCells = document.querySelectorAll(
        ".human-active-playerBoard  .activeGame-boardCell"
      );

      const humanHitShip = computerPlayer.playerBoard.returnCoordinatesAreShip(
        shipAttackCoordinates
      );
      let computerHitShip = true;

      const delayTime = 1250;

      humanAttack(computerPlayer, shipAttackCoordinates, computerBoardCells);

      if (humanHitShip) {
        return;
      }

      boardsContainer.classList.toggle("flipped");

      await sleep(delayTime);

      while (computerHitShip) {
        computerAttack(humanPlayer, humanBoardCells);

        computerHitShip = computerPlayer.currentComputerHitSquareContent;

        await sleep(delayTime - 150);
      }

      boardsContainer.classList.toggle("flipped");
    });
  });
  computerPlayerBoardCells.forEach((computerPlayerBoardCell) => {
    computerPlayerBoardCell.addEventListener("mouseover", (event) => {
      const hoveredCell = event.target.closest(".activeGame-boardCell");
      if (hoveredCell.className.split(" ").length == 1) {
        hoveredCell.classList.add("valid-hit-square");
      }
    });
    computerPlayerBoardCell.addEventListener("mouseleave", () => {
      computerPlayerBoardCells.forEach((selectionCell) => {
        selectionCell.classList.remove("valid-hit-square");
      });
    });
  });

  selectionCells.forEach((selectionCell) => {
    selectionCell.addEventListener("click", (event) => {
      if (event.currentTarget != event.target) {
        return;
      }

      const shipPlacementCoordinates = +event.target.dataset.coordinates;
      placePlayerShip(humanPlayer, shipPlacementCoordinates, selectionCells);
    });
    selectionCell.addEventListener("mouseover", (event) => {
      const shipPlacementCoordinates =
        +event.target.closest(".preGame-boardCell").dataset.coordinates;
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
