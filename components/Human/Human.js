import React, { Component } from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel, Icon } from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import style from '../StyleGuide/styles'
import Firebase from '../Firebase/Firebase'

export class Human extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerStyle: {
      backgroundColor: BLUE,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM
    },
    headerLeft: null,
    headerRight: <Icon name={'clear'} iconStyle={style.icon} color={'white'}
                       onPress={() => navigation.goBack()} underlayColor={BLUE}/>
  })

  componentWillMount () {
    let user = Firebase.getAuth().currentUser
    this.setState({user})
  }

  render () {
    let {user} = this.state
    user = user || {}
    return (
      <View style={{flex: 1, backgroundColor: BLUE, height: '100%'}}>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Name</FormLabel>
        <FormInput disabled value={`${user.displayName}`}/>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Email</FormLabel>
        <FormInput disabled value={user.email}/>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Hourly Rate</FormLabel>
      </View>
    )
  }
}

export default Human