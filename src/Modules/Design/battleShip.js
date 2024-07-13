function battleShip(length){
    const getLength = () => length

    let hits = 0
    const receiveHit = () => hits++

    const isSunk = () => hits == length

    return {
        getLength,
        receiveHit,
        isSunk
    }
}

export { battleShip }