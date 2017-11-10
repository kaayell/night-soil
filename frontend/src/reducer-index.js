import { combineReducers } from 'redux'
import menuOpen from "./Menu/menu-reducer"
import activePage from "./Navigation/navigation-reducer"
import humanInfo from "./Human/human-reducer"

export default combineReducers({
    menuOpen,
    activePage,
    humanInfo
})