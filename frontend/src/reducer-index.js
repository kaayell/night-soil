import {combineReducers} from 'redux'
import activePage from "./Navigation/navigation-reducer"
import humanInfo from "./Human/human-reducer"

export default combineReducers({
    activePage,
    humanInfo
})