import React, { Component } from 'react'
import { connect } from 'react-redux'
import { saveTime } from './timer-actions'
import { Image, View } from 'react-native'

export class Timer extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Timer',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/timer_grey_24x24.png')}
             style={{tintColor: tintColor}}/>,
    headerStyle: {
      backgroundColor: '#9AC0CD'
    },
    headerTitleStyle: {
      color: '#fafafa',
      fontFamily: 'roboto-medium'
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
    this.props.setActivePage('create')
  }

  formatSeconds (sec) {
    return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2)
  }

  render () {
    return <View/>

  }
}

// const startOrStopButton = this.state.secondsElapsed === 0 || this.state.stopTimer ?
//     <Button transparent dark onPress={this.handleStartClick}><Text>START</Text></Button>
//     : <Button transparent dark onPress={this.handleStopClick}><Text>STOP</Text></Button>
//
// const recordButton = this.state.secondsElapsed > 0 && this.state.stopTimer ?
//     <Button transparent dark onPress={this.handleRecordClick}><Text>RECORD?</Text></Button> : null
//
// return (
//     <Content padder style={{flex: 1, flexDirection: 'row', marginTop: 20, width: "100%", backgroundColor: "rgb(248,248,248)"}}>
//         <Image source={require("../kawaii-poop.png")} style={{width:270, height: 220}}/>
//         <Text>{this.formatSeconds(this.state.secondsElapsed)}</Text>
//         {startOrStopButton}
//         <Button transparent dark onPress={this.handleResetClick}>
//             <Text>RESET</Text>
//         </Button>
//         {recordButton}
//     </Content>
// )

export default connect(null, {saveTime})(Timer)