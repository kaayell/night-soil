import React, {Component} from 'react'
import kawaiipoop from '../kawaii-poop.png'
import './Timer.css'
import {FlatButton} from "material-ui";
import {connect} from "react-redux";
import {saveTime} from "./timer-actions";
import {setActivePage} from "../Navigation/navigation-actions";

export class Timer extends Component {
    constructor(props) {
        super(props)

        this.handleStartClick = this.handleStartClick.bind(this)
        this.handleStopClick = this.handleStopClick.bind(this)
        this.handleResetClick = this.handleResetClick.bind(this)
        this.handleRecordClick = this.handleRecordClick.bind(this)

        this.state = {
            secondsElapsed: 0,
            stopTimer: false
        }

        this.incrementer = null
    }

    handleStartClick() {
        this.incrementer = setInterval(() =>
                this.setState({
                    secondsElapsed: this.state.secondsElapsed + 1
                })
            , 1000)
        this.setState({stopTimer: false})
    }

    handleStopClick() {
        clearInterval(this.incrementer)
        this.setState({stopTimer: true})
    }

    handleResetClick() {
        this.setState({secondsElapsed: 0})
    }

    handleRecordClick(){
        this.props.saveTime(`${Math.floor(this.state.secondsElapsed / 60)}`)
        this.props.setActivePage("create")
    }

    formatSeconds(sec) {
        return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
    }

    render() {
        const startOrStopButton = this.state.secondsElapsed === 0 || this.state.stopTimer ?
            <FlatButton label="Start" onClick={this.handleStartClick}/>
            : <FlatButton label="Stop" onClick={this.handleStopClick}/>

        const recordButton = this.state.secondsElapsed > 0 && this.state.stopTimer ?
            <FlatButton label="Record?" onClick={this.handleRecordClick}/> : ""
        return (
            <div className="timer-container">
                <img className={this.state.secondsElapsed === 0 || this.state.stopTimer ? "" : "poop-timer"}
                     src={kawaiipoop}
                     alt="poop"
                     width="200"
                     height="160"/>
                <div className="stopwatch-container">
                    <label className="timer-label">{this.formatSeconds(this.state.secondsElapsed)}</label>
                    <div className="stopwatch-buttons">
                        {startOrStopButton}
                        <FlatButton label="Reset" onClick={this.handleResetClick}/>
                    </div>
                    <div>
                        {recordButton}
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(null, {saveTime, setActivePage})(Timer);