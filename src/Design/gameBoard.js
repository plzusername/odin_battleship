export function gameBoard() {
  const Board = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  ];

  let shipsAvailable = 0;

  function storeShipInBoard(coordinates, ship, rotation) {
    let vertical_increment = 0;
    let horizontal_increment = 1;

    Board[coordinates] = ship;
    for (let i = 0; i < ship.getLength() - 1; i++) {
      if (rotation == "Vertical") {
        vertical_increment = 1;
        horizontal_increment = 0;
      }
      Board[
        coordinates +
          vertical_increment * 10 * (i + 1) +
          horizontal_increment * (i + 1)
      ] = ship;
    }
  }

  function get_squares_neighbors(squareIndex) {
    const neighboring_squares = [-10, 10, 11, -11, 9, -9, 1, -1];

    return neighboring_squares
      .filter(
        (neighborIndex) =>
          squareIndex + neighborIndex > -1 &&
          squareIndex + neighborIndex < 100 &&
          Board[squareIndex + neighborIndex]
      )
      .map((neighbor) => squareIndex + neighbor);
  }

  function isSpaciousSquare(coordinates, shipLength, rotation) {
    if (
      ((coordinates % 10) + shipLength - 1 > 9 && rotation == "Horizontal") ||
      (Math.floor(coordinates / 10) + shipLength - 1 > 9 &&
        rotation == "Vertical")
    )
      return false;

    const direction_to_be_checked = [
      rotation == "Vertical",
      rotation == "Horizontal",
    ];

    for (let i = 0; i < shipLength; i++) {
      const row_index = Math.floor(coordinates / 10);
      const column_index = coordinates % 10;

      const current_ship_block_index =
        (row_index + direction_to_be_checked[0] * i) * 10 +
        (column_index + direction_to_be_checked[1] * i);

      if (
        !(
          get_squares_neighbors(current_ship_block_index).length == 0 ||
          ((i == 0 || i == shipLength - 1) &&
            get_squares_neighbors(current_ship_block_index).length == 1) ||
          get_squares_neighbors(current_ship_block_index).length == 2
        )
      )
        return false;
    }
    return true;
  }

  function placeShip(ship, coordinates, rotation) {
    if (isSpaciousSquare(coordinates, ship.getLength(), rotation)) {
      storeShipInBoard(coordinates, ship, rotation);
      shipsAvailable++;

      return "Valid placement";
    }

    return "Invalid placement";
  }

  function registerShipAttack(squareIndex) {
    if (squareIndex == null) return;

    Board[squareIndex].receiveHit();
    registerShipAttack(get_squares_neighbors(squareIndex));
  }

  function receiveHit(coordinates) {
    if (Board[coordinates] == -1) return "Invalid hit";

    if (Board[coordinates]) {
      Board[coordinates].receiveHit();

      for (let i = 0; i < get_squares_neighbors().length; i++) {
        registerShipAttack(get_squares_neighbors()[i]);
      }
      if (Board[coordinates].isSunk()) shipsAvailable -= 1;

      Board[coordinates] = -1;
      return "Valid hit";
    }
    if (!Board[coordinates]) {
      Board[coordinates] = -1;
      return "Valid hit, empty square";
    }
  }

  function allShipsSunken() {
    return shipsAvailable == 0;
  }

  return {
    placeShip,
    receiveHit,
    allShipsSunken,
  };
}
