import * as timerTypes from "./timer-types"

export default function poopTime(state = null, action = {}) {
    switch (action.type) {
        case timerTypes.SAVE_TIME:
            return action.poopTime
        case timerTypes.CLEAR_TIME:
            return null
        default:
            return state
    }
}