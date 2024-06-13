import { battleShip } from '../Design/battleShip'

describe('Test the isHit() function of the battleShip object',() =>{
    test('battleShip should not be sunk on initialisation', () =>{
        const battleShip1 = battleShip(4)

        expect(battleShip1.isSunk()).toBe(false)
    })

    test('battleShip should not be sunk after enduring only 3 hits', () =>{
        const battleShip1 = battleShip(4)

        battleShip1.receiveHit()
        battleShip1.receiveHit()
        battleShip1.receiveHit()

        expect(battleShip1.isSunk()).toBe(false)
    })

    test('battleShip be sunk after enduring 4 hits', () =>{
        const battleShip1 = battleShip(4)

        battleShip1.receiveHit()
        battleShip1.receiveHit()
        battleShip1.receiveHit()
        battleShip1.receiveHit()

        expect(battleShip1.isSunk()).toBe(true)
    })

})