import poopTime from "./timer-reducer"
import * as timerActions from "./timer-actions"

describe('timer reducer', () => {

    it('should save poop time', () => {
        expect(poopTime(null, timerActions.saveTime("1565"))).toEqual("1565")
    })

    it('should clear poop time', () => {
        expect(poopTime(null, timerActions.clearTime())).toEqual(null)
    })
})