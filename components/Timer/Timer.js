import React, {Component} from 'react'
import {Image, Platform, StatusBar, Text, TouchableOpacity, View} from 'react-native'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import {POPPINS_MEDIUM} from '../StyleGuide/fonts'
import {Button, Icon} from 'react-native-elements'
import moment from 'moment'

export class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: 0,
      displayStart: 'START',
      endTime: 0,
      displayEnd: 'END',
    }
  }

  handleStartClick() {
    let timeMs = moment()
    let displayStart = timeMs.format('h:mm:ss a')
    this.setState({startTime: timeMs, displayStart: displayStart})
  }

  handleStopClick() {
    let timeMs = moment()
    let displayEnd = timeMs.format('h:mm:ss a')
    this.setState({endTime: timeMs, displayEnd: displayEnd})
  }

  handleRecordClick() {
    let duration = this.state.endTime.diff(this.state.startTime)
    this.props.navigation.navigate('Create', {duration: duration})
  }

  render() {
    const paddingTop = Platform.OS === "ios" ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10;
    return (
      <View style={{flex: 1, backgroundColor: BLUE, height: "100%", paddingTop}}>
        <TouchableOpacity style={{
          flexDirection: "row",
          height: "5%",
          justifyContent: 'flex-end',
          paddingRight: 15
        }}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={"close"} color={OFF_WHITE}/>
        </TouchableOpacity>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: BLUE,
        }}>
          <Button
            title={this.state.displayStart}
            onPress={() => this.handleStartClick()}
            textStyle={{
              color: OFF_WHITE, fontWeight: '700', fontFamily: POPPINS_MEDIUM,
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              width: 300,
              height: 45,
              borderColor: OFF_WHITE,
              borderWidth: .5,
              borderRadius: 5,
              margin: 10,
            }}
          />
          <Button
            title={this.state.displayEnd}
            onPress={() => this.handleStopClick()}
            textStyle={{
              color: OFF_WHITE, fontWeight: '700',
              fontFamily: POPPINS_MEDIUM,
            }}
            buttonStyle={{
              backgroundColor: 'transparent',
              width: 300,
              height: 45,
              borderColor: OFF_WHITE,
              borderWidth: .5,
              borderRadius: 5,
              margin: 10,
            }}
          />
          <Text style={{
            margin: 10,
            fontSize: 20,
            color: OFF_WHITE,
            fontFamily: POPPINS_MEDIUM,
          }}>
            {this.state.startTime && this.state.endTime ? moment(
              this.state.endTime.diff(this.state.startTime)).format('mm:ss') : ''}
          </Text>
          <Button
            title='RECORD'
            onPress={() => this.handleRecordClick()}
            textStyle={{color: OFF_WHITE, fontWeight: '700'}}
            buttonStyle={{
              backgroundColor: 'transparent',
              width: 300,
              height: 45,
              borderColor: OFF_WHITE,
              borderWidth: .5,
              borderRadius: 5,
            }}
          />
        </View>
      </View>
    )
  }
}

export default Timer