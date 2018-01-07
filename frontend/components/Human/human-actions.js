import * as humanTypes from "./human-types"

export function setHumanInfo(humanInfo) {
    return {
        type: humanTypes.SET_HUMAN_INFO,
        humanInfo
    }
}