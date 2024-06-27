import { battleShip } from "../Design/battleShip";
import { gameBoard } from "../Design/gameBoard";

describe("Test the placement function of battleships", () => {
  const myGameBoard = gameBoard();

  test("should place battleship at designated coordinates", () => {
    const myBattleShip = battleShip(4);

    expect(myGameBoard.placeShip(myBattleShip, 1, "Vertical")).toBe(
      "Valid placement"
    );
  });

  test("should not place battleship at designated coordinates if the ship is placed partially outside the board", () => {
    const myDestroyer = battleShip(4);

    expect(myGameBoard.placeShip(myDestroyer, 80, "Vertical")).toBe(
      "Invalid placement"
    );
  });

  test("should not place battleship at if it is in close proximity to another battleship", () => {
    const myDestroyer = battleShip(4);
    const myCruiser = battleShip(3);

    expect(myGameBoard.placeShip(myDestroyer, 47, "Vertical")).toBe(
      "Valid placement"
    );
    expect(myGameBoard.placeShip(myCruiser, 48, "Vertical")).toBe(
      "Invalid placement"
    );
  });
});

describe("Test gameboards registration and processing of hits ", () => {
  const myGameBoard = gameBoard();

  test("Should send hit function to targeted ship after successful hit", () => {
    const myBattleShip = battleShip(4);
    myGameBoard.placeShip(myBattleShip, 6, "Vertical");

    expect(myGameBoard.receiveHit(6)).toBe("Valid hit");
  });

  test("Should not register succesful hit if square has already been targeted", () => {
    const myDestroyer = battleShip(4);
    myGameBoard.placeShip(myDestroyer, 4, "Vertical");
    myGameBoard.receiveHit(4);

    expect(myGameBoard.receiveHit(4)).toBe("Invalid hit");
  });

  test("Should register succesful hit when targeting empty square", () => {
    const myCruiser = battleShip(3);
    myGameBoard.placeShip(myCruiser, 4, "Vertical");

    expect(myGameBoard.receiveHit(8)).toBe("Valid hit, empty square");
  });
});

describe("Test gameBoard tracking of all unsunken ships ", () => {
  test("Should return true when all ships are sunken", () => {
    const myGameBoard = gameBoard();

    const myBattleShip = battleShip(4);
    myGameBoard.placeShip(myBattleShip, 6, "Vertical");
    myGameBoard.receiveHit(6);
    myGameBoard.receiveHit(16);
    myGameBoard.receiveHit(26);
    myGameBoard.receiveHit(36);

    expect(myGameBoard.allShipsSunken()).toBe(true);
  });

  test("Should return false when all ships are not sunken", () => {
    const myGameBoard = gameBoard();

    const myBattleShip = battleShip(5);
    myGameBoard.placeShip(myBattleShip, 43, "Vertical");
    myGameBoard.receiveHit(43);
    myGameBoard.receiveHit(53);
    myGameBoard.receiveHit(63);
    myGameBoard.receiveHit(73);

    expect(myGameBoard.allShipsSunken()).toBe(false);
  });
});

describe("Test rotation of battleShips when placing them ", () => {
  test("Should test vertical placement", () => {
    const myGameBoard = gameBoard();

    const myBattleShip = battleShip(4);
    myGameBoard.placeShip(myBattleShip, 6, "Vertical");
    myGameBoard.receiveHit(6);
    myGameBoard.receiveHit(16);
    myGameBoard.receiveHit(26);
    myGameBoard.receiveHit(36);

    expect(myGameBoard.allShipsSunken()).toBe(true);
  });

  test("Should test horizontal placement", () => {
    const myGameBoard = gameBoard();

    const myBattleShip = battleShip(4);
    myGameBoard.placeShip(myBattleShip, 6, "Horizontal");
    myGameBoard.receiveHit(6);
    myGameBoard.receiveHit(7);
    myGameBoard.receiveHit(8);
    myGameBoard.receiveHit(9);

    expect(myGameBoard.allShipsSunken()).toBe(true);
  });
});
