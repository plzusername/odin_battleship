export function gameBoard() {
  let Board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];
  let shipLocations = [];
  let shipsAvailable = 0;

  function getRotationIncrement(rotation) {
    return rotation == "Vertical" ? 10 : 1;
  }

  function returnShipOccupiedSquares(coordinates, shipLength, rotation) {
    const increment = getRotationIncrement(rotation);
    const shipOccupiedSquares = [];

    for (let i = 0; i < shipLength; i++) {
      shipOccupiedSquares.push(coordinates + i * increment);
    }

    return shipOccupiedSquares;
  }

  function storeShipInBoard(coordinates, ship, rotation) {
    const shipLength = ship.getLength();
    Board[coordinates] = ship;

    for (let i = 0; i < shipLength; i++) {
      const increment = getRotationIncrement(rotation);
      Board[coordinates + increment * i] = ship;
    }
  }

  function get_squares_neighbors(squareIndex) {
    return get_neighbors(squareIndex).filter((indecies) => {
      return isObject(Board[indecies]);
    });
  }
  function isObject(val) {
    return val != null && val.constructor.name === "Object";
  }

  function get_neighbors(squareIndex) {
    const neighboring_squares = [-10, 10, 11, -11, 9, -9, 1, -1];

    return neighboring_squares
      .map((neighborOffset) => {
        return squareIndex + neighborOffset;
      })
      .filter(
        (neighborSquare) =>
          neighborSquare > -1 &&
          neighborSquare < 100 &&
          Math.abs((neighborSquare % 10) - (squareIndex % 10) <= 1)
      );
  }

  function isSpaciousSquare(coordinates, shipLength, rotation) {
    if (
      ((coordinates % 10) + shipLength > 10 && rotation == "Horizontal") ||
      (Math.floor(coordinates / 10) + shipLength > 10 && rotation == "Vertical")
    ) {
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      const increment = getRotationIncrement(rotation);

      const current_ship_block_index = coordinates + i * increment;

      if (get_squares_neighbors(current_ship_block_index).length > 0) {
        // console.log(get_neighbors(current_ship_block_index));
        // console.log("NOT SPACIOUS", shipLength, coordinates, rotation);
        return false;
      }
    }
    return true;
  }

  function placeShip(ship, coordinates, rotation) {
    const shipLength = ship.getLength();
    if (isSpaciousSquare(coordinates, shipLength, rotation)) {
      storeShipInBoard(coordinates, ship, rotation);
      shipLocations.push({
        coordinates,
        shipLength,
        rotation,
        occupiedSquares: returnShipOccupiedSquares(
          coordinates,
          shipLength,
          rotation
        ),
        ship,
      });
      shipsAvailable++;
      // console.log(shipsAvailable);

      return "Valid placement";
    }

    return "Invalid placement";
  }

  function receiveHit(coordinates) {
    const validity_of_hit = validHit(coordinates);

    if (isObject(Board[coordinates])) {
      console.log(Board[coordinates].getHits(), "First attempt");
      for (let i = 0; i < shipLocations.length; i++) {
        const shipLocation = shipLocations[i];
        const shipOccupiedSquares = shipLocation.occupiedSquares;
        const shipLength = shipLocation.shipLength;

        const verticalAlignment =
          (shipOccupiedSquares[shipOccupiedSquares.length - 1] % 10) -
            (coordinates % 10) <
            shipLength &&
          shipOccupiedSquares[shipOccupiedSquares.length - 1] % 10 ==
            coordinates % 10;

        const horizontalAlignment =
          shipOccupiedSquares[shipOccupiedSquares.length - 1] - coordinates <
            shipLength &&
          Math.floor(
            shipOccupiedSquares[shipOccupiedSquares.length - 1] / 10
          ) == Math.floor(coordinates / 10);

        if (verticalAlignment || horizontalAlignment) {
          shipOccupiedSquares.forEach((occupiedSquare) => {
            if (isObject(Board[occupiedSquare])) {
              Board[occupiedSquare].receiveHit();

              // the problem is in js object reference shi
            }
          });
        }
      }
      console.log(Board[coordinates].isSunk());
      console.log(Board[coordinates].getLength());
      console.log(Board[coordinates].getHits(), "Second attempt");

      if (Board[coordinates].isSunk()) shipsAvailable -= 1;
      Board[coordinates] = "X";
    }
    if (!Board[coordinates]) {
      Board[coordinates] = -1;
    }

    return validity_of_hit;
  }

  function validHit(coordinates) {
    if (Board[coordinates] === "X" || Board[coordinates] === -1)
      return "Invalid hit";
    if (Board[coordinates]) return "Valid hit";
    if (Board[coordinates] === 0) return "Valid hit, empty square";
  }

  function allShipsSunken() {
    return shipsAvailable == 0;
  }

  function prettyPrint(board) {
    function getEdge(index) {
      let edgesPresent = { horizontal: null, vertical: null };
      if (index < 10) {
        edgesPresent.vertical = 0;
      }
      if (index % 10 == 0) {
        edgesPresent.horizontal = 0;
      }

      if (index > 89) {
        edgesPresent.vertical = 10;
      }
      if (index % 10 == 9) {
        edgesPresent.horizontal = 10;
      }

      return edgesPresent;
    }
    function isObject(obj) {
      return obj != null && obj.constructor.name === "Object";
    }

    function addBorders(edges, cellContent) {
      let borders = ` ${cellContent}`;
      if (edges.horizontal != 10) borders += " |";
      if (edges.horizontal == 10 && edges.vertical != 10)
        borders += "\n ======================================= \n";

      return borders;
    }

    function mapItem(cellContent) {
      const shipEmoji = String.fromCodePoint(0x1f6a2);
      const collisionEmoji = String.fromCodePoint(0x1f4a5);
      if (isObject(cellContent)) {
        return shipEmoji;
      }
      if (cellContent == -1 || cellContent == "X") {
        return collisionEmoji;
      }

      return cellContent;
    }

    let prettyBoard = "";

    for (let i = 0; i < board.length; i++) {
      const cell = board[i];
      const boardEdges = getEdge(i);
      const prettifiedItem = mapItem(cell);

      prettyBoard += addBorders(boardEdges, prettifiedItem);
    }

    return prettyBoard;
  }

  return {
    placeShip,
    receiveHit,
    allShipsSunken,
    validHit,
    isSpaciousSquare,
    get_squares_neighbors,
    get_neighbors,
    returnShipOccupiedSquares,
    prettyPrint,
    Board,
  };
}
