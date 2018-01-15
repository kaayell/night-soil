import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as apiClient from '../../api/apiClient'
import { Image, Text, View } from 'react-native'
import BaseView from '../BaseView/BaseView'
import ActionButton from 'react-native-action-button'
import { Icon } from 'expo'

export class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/home_grey_24x24.png')}
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
    return (
      <BaseView>
        <Text>Pooooopin</Text>
        <ActionButton
          position="right"
          buttonColor="rgb(154, 192, 205)"
          onPress={() =>{ this.props.navigation.navigate("Create")}}
          />
      </BaseView>)
  }
}

const mapStateToProps = state => {
  return {
    humanInfo: state.humanInfo
  }
}

export default connect(mapStateToProps)(Home)