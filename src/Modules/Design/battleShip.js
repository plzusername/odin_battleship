function battleShip(length) {
  let hits = 0;

  const getLength = () => length;
  const getHits = () => hits;
  const receiveHit = () => hits++;
  const isSunk = () => hits == length;

  return {
    getLength,
    receiveHit,
    isSunk,
    getHits,
  };
}

export { battleShip };
