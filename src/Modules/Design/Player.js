import { battleShip } from "../Design/battleShip";
import { gameBoard } from "../Design/gameBoard";

export function player() {
  const playerBoard = gameBoard();
  const ships = [2, 2, 3, 4, 5];
  const rotations = ["Vertical", "Horizontal"];
  const board = playerBoard.Board;

  function isWinner(opponent) {
    return opponent.playerBoard.allShipsSunken();
  }

  function get_squares_neighbors(squareIndex, board) {
    const neighboring_squares = [-10, 10, 11, -11, 9, -9, 1, -1];

    return neighboring_squares
      .filter(
        (neighborIndex) =>
          squareIndex + neighborIndex > -1 &&
          squareIndex + neighborIndex < 100 &&
          board[squareIndex + neighborIndex]
      )
      .map((neighbor) => squareIndex + neighbor);
  }

  function generateRandomNumber(min, max) {
    return min + Math.round(Math.random() * max);
  }

  function addShip(ship, coordinates, rotation) {
    playerBoard.placeShip(ship, coordinates, rotation);
  }

  function remove_from_possibilities(board, squares) {
    let squares_index = 0;
    for (let i = 0; i < board.length; i++) {
      if (board[i] == squares[squares_index]) {
        board.splice(i, 1);
        i--;
        squares_index++;
      }
    }
  }

  function placeShipRandomly(ship, currentBoard) {
    const rotation = getRandomRotation();
    const board_reference = currentBoard.filter((square) => {
      let ship_direction_to_edge = square;
      if (rotation == "Vertical") ship_direction_to_edge = square % 10;

      return ship_direction_to_edge + ship.getLength() > 10;
    });
    const random_coordinates = getRandomCoords(board_reference);
    const occupied_squares = board_reference
      .reduce((square, accumalitive_array) => {
        accumalitive_array.push(get_squares_neighbors(square));
      }, [])
      .filter((square, index, array) => index == array.indexOf(square));

    addShip(ship, random_coordinates, rotation);
    remove_from_possibilities(currentBoard, occupied_squares);
  }

  function placeShipsRandomly() {
    let possible_possitions = board;
    ships.forEach((shipLength) => {
      const warShip = battleShip(shipLength);

      placeShipRandomly(warShip, possible_possitions);
    });
  }

  function getRandomRotation() {
    return rotations[generateRandomNumber(0, 1)];
  }
  function getRandomCoords(board) {
    return board[generateRandomNumber(0, board.length - 1)];
  }

  function placeShipManager() {
    let rotation = "Vertical";
    let shipIndex = 0;
    let shipLengths = [5, 4, 3, 3, 2];

    function toggleRotation() {
      if (rotation == "Vertical") {
        rotation = "Horizontal";
        return rotation;
      }
      rotation = "Vertical";

      return rotation;
    }

    function getCurrentShip() {
      shipLengths[shipIndex];
    }

    function moveToNextShip() {
      shipIndex++;
      return shipLengths[shipIndex];
    }
    return { toggleRotation, getCurrentShip, moveToNextShip };
  }

  function hitSquare(coordinates, opponent) {
    opponent.playerBoard.receiveHit(coordinates);
  }

  function Computer() {
    let anchorSquare = -1;
    let neighboring_squares_index = 0;
    let rotation_decided = false;

    function saveHitSquare(coords) {
      anchorSquare = coords;
    }

    function makeHit(coords, opponentBoard) {
      if (opponentBoard.receiveHit(coords) == "Valid hit") {
        saveHitSquare(coords);
      }

      return opponentBoard.validHit(coords);
    }

    function makeAIhit(opponentBoard) {
      const neighboring_squares = [10, -10, 1, -1].filter(
        (square) =>
          square + anchorSquare > -1 &&
          square + anchorSquare < 100 &&
          opponentBoard.Board[anchorSquare + square] != -1
      );
      const current_searched_square =
        neighboring_squares[neighboring_squares_index];

      anchorSquare += current_searched_square;

      const hit_validity = opponentBoard.validHit(anchorSquare);

      if (
        hit_validity == "Valid hit" &&
        opponentBoard.Board[anchorSquare].isSunk()
      ) {
        anchorSquare = -1;
        neighboring_squares_index = 0;
        rotation_decided = false;

        return opponentBoard.receiveHit(anchorSquare);
      }

      opponentBoard.receiveHit(anchorSquare);

      if (hit_validity == "Valid hit, empty square" && rotation_decided) {
        neighboring_squares_index +=
          neighboring_squares_index % 2 == 0 ? 1 : -1;
      }
      if (hit_validity == "Valid hit, empty square" && !rotation_decided) {
        neighboring_squares_index++;
      }
      if (hit_validity == "Valid hit") {
        rotation_decided = true;
      }

      return hit_validity;
    }

    function makeComputerHit(coords, opponentBoard) {
      if (anchorSquare != -1) {
        makeAIhit(opponentBoard);
        return;
      }
      makeHit(coords, opponentBoard);
    }

    return {
      ...player(),
      makeHit,
      makeAIhit,
      makeComputerHit,
    };
  }

  return {
    isWinner,
    placeShipsRandomly,
    addShip,
    Computer,
    hitSquare,
    placeShipManager,
    playerBoard,
  };
}
