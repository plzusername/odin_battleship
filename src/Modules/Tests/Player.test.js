import { player } from "../Design/Player";
import { battleShip } from "../Design/battleShip";
import { gameBoard } from "../Design/gameBoard";

describe("test for valid computer ship placements", () => {
  const computerPlayer = player().Computer();

  test("computer should place ships as to not overflow out of the board or come in contact with other warships", () => {
    computerPlayer.placeShipsRandomly();
    expect(computerPlayer.playerBoard.shipLocations.length).toEqual(5);
  });
});

describe("test for intelligient hit behaviour from the computer", () => {
  const computerPlayer = player().Computer();
  const humanPlayer = player();
  const humanBattleShip = battleShip(5);

  test("Computer should have hit the ship square next to the targe square after at least 3 tries", () => {
    humanPlayer.addShip(humanBattleShip, 2, "Vertical");
    computerPlayer.makeHit(2, humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    expect(computerPlayer.makeAIhit(humanPlayer.playerBoard)).toBe("Valid hit");
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    expect(humanPlayer.playerBoard.allShipsSunken()).toBe(true);
  });
});

describe("Should determine victor from two competing players", () => {
  const computerPlayer = player().Computer();
  const humanPlayer = player();
  const humanShip = battleShip(3);
  const commputerShip = battleShip(3);

  humanPlayer.addShip(humanShip, 50, "Vertical");
  computerPlayer.addShip(commputerShip, 56, "Vertical");

  test("Should declare the computer victor after sinking all human players ships, while avoidning premptively declaring the computer as the winner", () => {
    computerPlayer.makeHit(50, humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);

    expect(computerPlayer.isWinner(humanPlayer)).toBe(false);

    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);
    computerPlayer.makeAIhit(humanPlayer.playerBoard);

    expect(computerPlayer.isWinner(humanPlayer)).toBe(true);
  });
});
