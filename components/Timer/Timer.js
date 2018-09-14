import React, {Component} from 'react'
import {Platform, StatusBar, Text, View} from 'react-native'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import {POPPINS_MEDIUM} from '../StyleGuide/fonts'
import {Button} from 'react-native-elements'
import moment from 'moment'

let textStyle = {color: OFF_WHITE, fontWeight: '700', fontFamily: POPPINS_MEDIUM,};
let buttonStyle = {
  backgroundColor: 'transparent',
  width: 150,
  height: 45,
  borderColor: OFF_WHITE,
  borderWidth: .5,
  borderRadius: 5
};

export class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: 0,
      displayStart: 'START POOPIN',
      endTime: 0,
      displayEnd: 'ALL DONE',
    }
  }

  handleStartClick() {
    let timeMs = moment()
    let displayStart = timeMs.format('h:mm:ss a')
    this.setState({startTime: timeMs, displayStart: displayStart, endTime: 0, displayEnd: 'ALL DONE'})
  }

  handleStopClick() {
    let timeMs = moment()
    let displayEnd = timeMs.format('h:mm:ss a')
    this.setState({endTime: timeMs, displayEnd: displayEnd})
    this.props.onTimerDone(moment.duration(timeMs.diff(this.state.startTime)).minutes());
  }

  render() {
    return (
      <View style={{backgroundColor: BLUE}}>
        <View style={{flex: 1, flexDirection: 'row'}}>
          <Button title={this.state.displayStart} onPress={() => this.handleStartClick()}
                  textStyle={textStyle} buttonStyle={buttonStyle}/>
          <Button title={this.state.displayEnd} onPress={() => this.handleStopClick()}
                  textStyle={textStyle} buttonStyle={buttonStyle}/>
        </View>
      </View>
    )
  }
}

export default Timer