import * as navigationTypes from "./navigation-types"

export function setActivePage(page) {
    return {
        type: navigationTypes.SET_ACTIVE_PAGE,
        page
    }
}