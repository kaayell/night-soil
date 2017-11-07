import * as navigationTypes from "./navigation-types"

export default function activePage(state = "home", action = {}) {
    if(action.type === navigationTypes.SET_ACTIVE_PAGE) return action.page
    return state
}