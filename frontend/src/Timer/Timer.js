import React, {Component} from 'react'
import kawaiipoop from '../kawaii-poop.png'
import './Timer.css'

class Timer extends Component {

    render() {
        return (
            <div className="timer-container">
                <img id="poop-timer"
                     src={kawaiipoop}
                     alt="poop"
                     width="200"
                     height="160"/>
            </div>
        )

    }
}

export default Timer;