import * as timerActions from "./timer-actions"
import * as timerTypes from "./timer-types"

describe('timer actions', () => {

    it('should create an action for saving time', () => {
        expect(timerActions.saveTime("1234568")).toEqual({
            type: timerTypes.SAVE_TIME,
            poopTime: "1234568"
        })
    })

    it('should create an action for clearing time', () => {
        expect(timerActions.clearTime()).toEqual({
            type: timerTypes.CLEAR_TIME
        })
    })
})