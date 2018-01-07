import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as apiClient from '../../api/apiClient'
import { Image, Text, View } from 'react-native'

export class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/home_grey_24x24.png')}
             style={{tintColor: tintColor}}/>
  })

  constructor (props) {
    super(props)

    this.state = {
      minutesToDate: 0,
      moneyToDate: 0
    }
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.humanInfo) {
      apiClient.getSummary(nextProps.humanInfo.id)
        .then((response) => {
          if (response.data) {
            this.setState({
              minutesToDate: response.data.minutesToDate,
              moneyToDate: response.data.moneyToDate
            })
          }
        })
    }
  }

  render () {
    return <View><Text>Pooooopin</Text></View>
  }
}

const mapStateToProps = state => {
  return {
    humanInfo: state.humanInfo
  }
}

export default connect(mapStateToProps)(Home)