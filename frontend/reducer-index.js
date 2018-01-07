import {combineReducers} from 'redux'
import humanInfo from "./components/Human/human-reducer"
import poopTime from "./components/Timer/timer-reducer"

export default combineReducers({
    humanInfo,
    poopTime
})