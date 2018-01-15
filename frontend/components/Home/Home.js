import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as apiClient from '../../api/apiClient'
import { Image, Text, TouchableHighlight } from 'react-native'
import BaseView from '../BaseView/BaseView'
import ActionButton from 'react-native-action-button'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import { POPPINS_MEDIUM } from '../StyleGuide/fonts'
import { Icon } from 'react-native-elements'
import style from '../StyleGuide/icon-styles'

export class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Home',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/home_grey_24x24.png')}
             style={{tintColor: tintColor}}/>,
    headerStyle: {
      backgroundColor: BLUE
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM
    },
    headerRight:
      <Icon name={'perm-identity'} iconStyle={style.icon} color={'white'}
            onPress={() => {navigation.navigate('Profile')}}
            underlayColor={BLUE}/>

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
      <BaseView style={{flex: 1}}>
        <Text>Pooooopin</Text>
        <ActionButton
          position="right"
          buttonColor="rgb(154, 192, 205)"
          onPress={() => { this.props.navigation.navigate('Create')}}
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