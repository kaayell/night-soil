import * as timerTypes from "./timer-types"

export function saveTime(poopTime) {
    return {
        type: timerTypes.SAVE_TIME,
        poopTime
    }
}

export function clearTime() {
    return {
        type: timerTypes.CLEAR_TIME
    }
}