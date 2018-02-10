import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Image, Text, View } from 'react-native'
import ActionButton from 'react-native-action-button'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import { POPPINS_MEDIUM } from '../StyleGuide/fonts'
import { Icon } from 'react-native-elements'
import style from '../StyleGuide/icon-styles'

export class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    title: <Image source={require('../../assets/poop.png')}
                  style={{width: 35, height: 35}}/>,
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

  render () {
    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1}}>
          <Text>Pooooopin</Text>
        </View>
        <View style={{height: 100}}>
          <ActionButton
            position="right"
            buttonColor="rgb(154, 192, 205)"
            onPress={() => { this.props.navigation.navigate('Create')}}
          />
        </View>
      </View>)
  }
}

const mapStateToProps = state => {
  return {
    humanInfo: state.humanInfo
  }
}

export default connect(mapStateToProps)(Home)