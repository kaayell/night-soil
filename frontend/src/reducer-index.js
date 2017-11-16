import {combineReducers} from 'redux'
import activePage from "./Navigation/navigation-reducer"
import humanInfo from "./Human/human-reducer"
import poopTime from "./Timer/timer-reducer"

export default combineReducers({
    activePage,
    humanInfo,
    poopTime
})