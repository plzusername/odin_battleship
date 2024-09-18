export function gameBoard() {
  let shipLocations = [];
  let hitSquares = [];
  let missedSquares = [];
  let shipsAvailable = 0;

  function getRotationIncrement(rotation) {
    return rotation == "Vertical" ? 10 : 1;
  }

  function returnShipOccupiedSquares(coordinates, shipLength, rotation) {
    const increment = getRotationIncrement(rotation);
    const shipOccupiedSquares = [];

    for (let i = 0; i < shipLength; i++) {
      shipOccupiedSquares.push(+coordinates + i * increment);
    }

    return shipOccupiedSquares;
  }

  function returnTargetSquares() {
    return new Array(100)
      .fill(null)
      .map((value, index) => index)
      .filter(
        (value) =>
          !(hitSquares.includes(value) || missedSquares.includes(value))
      );
  }

  function returnShipLocationAtCoords(coordinates) {
    for (let i = 0; i < shipLocations.length; i++) {
      const shipLocation = shipLocations[i];

      if (shipLocation.occupiedSquares.includes(coordinates)) {
        return shipLocation;
      }
    }
  }

  function returnPreviousShipAtCoords(coordinates) {
    for (let i = 0; i < shipLocations.length; i++) {
      const shipLocation = shipLocations[i];

      if (shipLocation.origSquares.includes(coordinates)) {
        return shipLocation;
      }
    }
  }

  function returnShipAtCoords(coordinates) {
    return returnShipLocationAtCoords(coordinates).ship;
  }

  function returnShipSquaresAtCoords(coordinates) {
    return returnPreviousShipAtCoords(coordinates).origSquares;
  }

  function returnCoordinatesWereNeighbor(coordinates) {
    const neighboringSquares = get_neighbors(coordinates);

    for (let i = 0; i < neighboringSquares.length; i++) {
      if (returnPreviousShipAtCoords(neighboringSquares[i]) != undefined) {
        return true;
      }
    }

    return false;
  }

  function getItemAtCoords(coordinates) {
    if (hitSquares.includes(coordinates)) return "X";
    if (missedSquares.includes(coordinates)) return -1;
    if (returnCoordinatesAreShip(coordinates))
      return returnShipAtCoords(coordinates);

    return 0;
  }

  function returnCoordinatesAreShip(coordinates) {
    for (let i = 0; i < shipLocations.length; i++) {
      const shipLocation = shipLocations[i];

      if (shipLocation.occupiedSquares.includes(coordinates)) {
        return true;
      }
    }
    return false;
  }

  function get_squares_neighbors(squareIndex) {
    return get_neighbors(squareIndex).filter((neighborSquares) => {
      return returnCoordinatesAreShip(neighborSquares);
    });
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
          Math.abs((neighborSquare % 10) - (squareIndex % 10)) <= 1
      );
  }

  function isSpaciousSquare(coordinates, shipLength, rotation) {
    coordinates = parseInt(coordinates);

    if (
      rotation == "Vertical" &&
      Math.floor(coordinates / 10) + shipLength > 10
    ) {
      return false;
    }
    if (rotation == "Horizontal" && (coordinates % 10) + shipLength > 10) {
      return false;
    }

    for (let i = 0; i < shipLength; i++) {
      const increment = getRotationIncrement(rotation);

      const current_ship_block_index = coordinates + i * increment;

      if (get_squares_neighbors(current_ship_block_index).length > 0) {
        return false;
      }
    }
    return true;
  }

  function placeShip(ship, coordinates, rotation) {
    const shipLength = ship.getLength();
    if (shipLength == undefined) return;

    if (isSpaciousSquare(coordinates, shipLength, rotation)) {
      shipLocations.push({
        coordinates,
        shipLength,
        rotation,
        occupiedSquares: returnShipOccupiedSquares(
          coordinates,
          shipLength,
          rotation
        ),
        origSquares: returnShipOccupiedSquares(
          coordinates,
          shipLength,
          rotation
        ),
        ship,
      });
      shipsAvailable++;

      return "Valid placement";
    }

    return "Invalid placement";
  }

  function receiveHit(coordinates) {
    const validity_of_hit = validHit(coordinates);

    if (returnCoordinatesAreShip(coordinates)) {
      returnShipAtCoords(coordinates).receiveHit();
      if (returnShipAtCoords(coordinates).isSunk()) shipsAvailable -= 1;

      hitSquares.push(coordinates);

      shipLocations.forEach((shipLocation) => {
        if (shipLocation.occupiedSquares.includes(coordinates)) {
          shipLocation.occupiedSquares.splice(
            shipLocation.occupiedSquares.indexOf(coordinates),
            1
          );
        }
      });
    }
    if (getItemAtCoords(coordinates) == 0) {
      missedSquares.push(coordinates);
    }

    return validity_of_hit;
  }

  function validHit(coordinates) {
    if (
      getItemAtCoords(coordinates) === "X" ||
      getItemAtCoords(coordinates) === -1
    )
      return "Invalid hit";
    if (returnCoordinatesAreShip(coordinates)) return "Valid hit";
    if (getItemAtCoords(coordinates) === 0) return "Valid hit, empty square";
  }

  function shipIsSunken(coordinates) {
    return returnPreviousShipAtCoords(coordinates).occupiedSquares.length == 0;
  }

  function allShipsSunken() {
    return shipsAvailable == 0;
  }

  function resetBoardSettings() {
    shipLocations = [];
    hitSquares = [];
    missedSquares = [];

    shipsAvailable = 5;
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
    getItemAtCoords,
    resetBoardSettings,
    shipIsSunken,
    returnCoordinatesAreShip,
    returnPreviousShipAtCoords,
    returnTargetSquares,
    returnShipSquaresAtCoords,
    returnCoordinatesWereNeighbor,
    get shipLocations() {
      return shipLocations;
    },
    get hitSquares() {
      return hitSquares;
    },
    get missedSquares() {
      return missedSquares;
    },
  };
}
