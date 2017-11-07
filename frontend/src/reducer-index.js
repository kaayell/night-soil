import { combineReducers } from 'redux'
import menuOpen from "./Menu/menu-reducer"
import activePage from "./Navigation/navigation-reducer"

export default combineReducers({
    menuOpen,
    activePage
})