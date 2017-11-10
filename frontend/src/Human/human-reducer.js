import * as humanTypes from "./human-types"

export default function humanInfo(state = {}, action = {}) {
    if(action.type === humanTypes.SET_HUMAN_INFO) return action.humanInfo
    return state
}