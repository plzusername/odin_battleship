import { battleShip } from "../Design/battleShip";
import { gameBoard } from "../Design/gameBoard";

function player() {
  const playerBoard = gameBoard();
  const rotations = ["Vertical", "Horizontal"];
  let placeShipManager = placeShipManagerFactory();

  function isWinner(opponent) {
    return opponent.playerBoard.allShipsSunken();
  }

  function generateRandomNumber(min, max) {
    return min + Math.round(Math.random() * max);
  }

  function addShip(ship, coordinates, rotation) {
    playerBoard.placeShip(ship, coordinates, rotation);
    placeShipManager.moveToNextShip();
  }

  function remove_from_possibilities(board, squares) {
    let board_clone = [...board];
    let squares_index = 0;

    for (let i = 0; i < board_clone.length; i++) {
      while (
        squares_index < squares.length &&
        board_clone[i] > squares[squares_index]
      ) {
        squares_index++;
      }

      if (board_clone[i] === squares[squares_index]) {
        board_clone.splice(i, 1);
        i--;
        squares_index++;
      }
    }

    return board_clone;
  }

  function placeShipRandomly(ship, currentBoard) {
    if (ship.getLength() == undefined) return;

    const rotation = getRandomRotation();

    const board_reference = currentBoard.filter((square) => {
      let isolatedShip = true;

      let withinBoardBounds = (square % 10) + ship.getLength() < 10;

      if (rotation == "Vertical") {
        withinBoardBounds = Math.floor(square / 10) + ship.getLength() < 10;
      }

      const increment = rotation == "Vertical" ? 10 : 1;

      for (let i = 0; i < ship.getLength(); i++) {
        if (!currentBoard.includes(square + i * increment)) {
          isolatedShip = false;
          break;
        }
      }

      return withinBoardBounds && isolatedShip;
    });

    const random_coordinates = getRandomBoardCoords(board_reference);
    let occupied_squares = [];

    for (let i = 0; i < ship.getLength(); i++) {
      const increment = rotation == "Vertical" ? 10 : 1;
      const shipCellCoordinate = random_coordinates + i * increment;

      occupied_squares.push(...playerBoard.get_neighbors(shipCellCoordinate));
      occupied_squares.push(shipCellCoordinate);
    }

    occupied_squares = occupied_squares.filter(
      (square, index, array) => index === array.indexOf(square)
    );

    addShip(ship, random_coordinates, rotation);

    placeShipRandomly(
      battleShip(placeShipManager.getCurrentShip()),
      remove_from_possibilities(
        currentBoard.sort((a, b) => a - b),
        occupied_squares.sort((a, b) => a - b)
      )
    );
  }

  function placeShipsRandomly() {
    let possible_possitions = new Array(100)
      .fill(0)
      .map((square, index) => index);
    const warShip = battleShip(placeShipManager.getCurrentShip());

    placeShipRandomly(warShip, possible_possitions);
  }

  function getRandomRotation() {
    return rotations[generateRandomNumber(0, 1)];
  }
  function getRandomBoardCoords(board) {
    return board[generateRandomNumber(0, board.length - 1)];
  }

  function placeShipManagerFactory() {
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
      return shipLengths[shipIndex];
    }

    function moveToNextShip() {
      shipIndex++;
      return shipLengths[shipIndex];
    }

    function getCurrentRotation() {
      return rotation;
    }
    return {
      toggleRotation,
      getCurrentShip,
      moveToNextShip,
      getCurrentRotation,
    };
  }

  function hitSquare(coordinates, opponent) {
    opponent.playerBoard.receiveHit(coordinates);
  }

  function Computer() {
    let anchor_square = null;
    let is_AI_activated = false;
    let current_searching_square = null;
    let neighboring_squares_index = 0;
    let ships_hit = 1;
    let anchor_square_neighbors = [];

    function saveHitSquare(coords, opponentBoard) {
      anchor_square = coords;
      current_searching_square = anchor_square;
      is_AI_activated = true;
      anchor_square_neighbors = [10, -10, 1, -1].filter(
        (square) =>
          square + anchor_square > -1 &&
          square + anchor_square < 100 &&
          opponentBoard.returnTargetSquares().includes(square + coords)
      );
    }

    function makeHit(coords, opponentBoard) {
      if (opponentBoard.validHit(coords) == "Valid hit") {
        saveHitSquare(coords, opponentBoard);
      }
      opponentBoard.receiveHit(coords);

      return opponentBoard.validHit(coords);
    }

    function makeAIhit(opponentBoard) {
      current_searching_square +=
        anchor_square_neighbors[neighboring_squares_index];

      const hit_validity = opponentBoard.validHit(current_searching_square);
      const hit_item = opponentBoard.getItemAtCoords(current_searching_square);

      const itemIsShip = opponentBoard.returnCoordinatesAreShip(
        current_searching_square
      );
      const itemIsEmpty = hit_item === 0;

      console.log(hit_item);

      opponentBoard.receiveHit(current_searching_square);

      if (itemIsShip) {
        console.log("IS a darn ship");
        ships_hit++;
      }

      if (itemIsEmpty && ships_hit === 1) {
        console.log("Change search square");
        neighboring_squares_index++;
        current_searching_square = anchor_square;

        return hit_validity;
      }
      if (itemIsEmpty && ships_hit > 1) {
        console.log("rotate");
        current_searching_square = anchor_square;
        neighboring_squares_index = anchor_square_neighbors.indexOf(
          neighboring_squares_index * -1
        );
      }

      if (itemIsShip && hit_item.isSunk()) {
        console.log("ggs");
        is_AI_activated = false;
        anchor_square = null;
        current_searching_square = null;
        anchor_square_neighbors = [];
        ships_hit = 0;
        neighboring_squares_index = 0;

        return hit_validity;
      }
      // const current_searched_square =
      // anchorSquareNeighbors[neighboring_squares_index];
      // anchorSquare += current_searched_square;
      // opponentBoard.receiveHit(anchorSquare);
      // console.log(anchorSquare);
      // if (hit_validity == "Valid hit") {
      //   ships_hit++;
      // }
      // if (
      //   hit_validity == "Valid hit" &&
      //   opponentBoard.getItemAtCoords(anchorSquare).isSunk()
      // ) {
      //   anchorSquare = -1;
      //   neighboring_squares_index = 0;
      //   rotation_decided = false;
      //   return hit_validity;
      // }
      // if (hit_validity == "Valid hit, empty square" && rotation_decided) {
      //   neighboring_squares_index = anchorSquareNeighbors.indexOf(
      //     current_searched_square * -1
      //   );
      //   anchorSquare -= current_searched_square * ships_hit;
      // }
      // if (hit_validity == "Valid hit, empty square" && !rotation_decided) {
      //   neighboring_squares_index++;
      //   anchorSquare -= current_searched_square;
      // }
      // if (hit_validity == "Valid hit" && ships_hit > 1) {
      //   rotation_decided = true;
      //   anchorSquare += current_searched_square;
      // }
      return hit_validity;
    }

    function makeComputerHit(opponentBoard) {
      const coordinates = getRandomBoardCoords(
        opponentBoard.returnTargetSquares()
      );

      if (is_AI_activated) {
        makeAIhit(opponentBoard);
        return;
      }
      makeHit(coordinates, opponentBoard);
    }

    return {
      ...player(),
      makeHit,
      makeAIhit,
      makeComputerHit,
    };
  }

  function resetPlayerSettings() {
    const getPlaceShipManager = () => placeShipManagerFactory();

    placeShipManager = getPlaceShipManager();
    playerBoard.resetBoardSettings();
  }

  return {
    isWinner,
    placeShipsRandomly,
    addShip,
    Computer,
    hitSquare,
    placeShipManagerFactory,
    placeShipRandomly,
    resetPlayerSettings,
    playerBoard,
    get placeShipManager() {
      return placeShipManager;
    },
  };
}

const humanPlayer = player();
const computerPlayer = player().Computer();

export { player, humanPlayer, computerPlayer };
