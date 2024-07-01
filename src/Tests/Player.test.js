import { player } from "../Design/Player";
import { battleShip } from "../Design/battleShip";
import { gameBoard } from "../Design/gameBoard";

describe("test for valid computer ship placements", () => {
  const computerPlayer = player().Computer();
  const humanPLayer = player();

  test("computer should place ships as to not overflow out of the board or come in contact with other warships", () => {
    computerPlayer.placeShips();
    expect(humanPLayer.board).not.toEqual(Array(100).fill(0));
  });
});

describe("test for intelligient hit behaviour from the computer", () => {
  const computerPlayer = player().Computer();
  const humanPlayer = player();
  const humanBattleShip = battleShip(4, 2, "Vertical");

  test("Computer should have hit the ship square next to the targe square after at least 3 tries", () => {
    humanPlayer.addShip(humanBattleShip);
    computerPlayer.makeHit(2);
    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();
    expect(computerPlayer.makeAIhit()).toBe("Valid hit");
  });
});

describe("Should determine victor from two competing players", () => {
  const computerPlayer = player().Computer();
  const humanPlayer = player();
  const humanShip = battleShip(3, 50, "Vertical");
  const commputerShip = battleShip(3, 56, "Vertical");

  humanPlayer.addShip(humanShip);
  computerPlayer.addShip(commputerShip);

  test("Should declare the computer victor after sinking all human players ships, while avoidning premptively declaring the computer as the winner", () => {
    computerPlayer.makeHit(50);
    computerPlayer.makeAIhit();

    expect(computerPlayer.isWinner()).toBe(false);

    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();
    computerPlayer.makeAIhit();

    expect(computerPlayer.isWinner()).toBe(true);
  });
});
