import * as menuTypes from "./menu-types"

export function toggleMenu() {
    return {
        type: menuTypes.TOGGLE_MENU
    }
}