import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveTime } from './timer-actions'
import { Button, Image, Text, View } from 'react-native'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import { POPPINS_MEDIUM } from '../StyleGuide/fonts'

export class Timer extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Timer',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/timer_grey_24x24.png')}
             style={{tintColor: tintColor}}/>,
    headerStyle: {
      backgroundColor: BLUE
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM
    }
  })

  constructor (props) {
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

  handleStartClick () {
    this.incrementer = setInterval(() =>
        this.setState({
          secondsElapsed: this.state.secondsElapsed + 1
        })
      , 1000)
    this.setState({stopTimer: false})
  }

  handleStopClick () {
    clearInterval(this.incrementer)
    this.setState({stopTimer: true})
  }

  handleResetClick () {
    this.setState({secondsElapsed: 0})
  }

  handleRecordClick () {
    this.props.saveTime(`${Math.floor(this.state.secondsElapsed / 60)}`)
  }

  formatSeconds (sec) {
    return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
  }

  render () {
    const startOrStopButton = this.state.secondsElapsed === 0 || this.state.stopTimer ?
      <Button title={'START'} onPress={this.handleStartClick}/>
      : <Button title={'STOP'} onPress={this.handleStopClick}/>

    const recordButton = this.state.secondsElapsed > 0 && this.state.stopTimer ?
      <Button title={'RECORD?'} onPress={this.handleRecordClick}/> : null

    return (
      <View>
        <Text>{this.formatSeconds(this.state.secondsElapsed)}</Text>
        {startOrStopButton}
        <Button title={'RESET'} onPress={this.handleResetClick}/>
        {recordButton}
      </View>
    )
  }
}

export default connect(null, {saveTime})(Timer)