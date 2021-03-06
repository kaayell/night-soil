import React, { Component } from 'react'
import {Button, View} from 'react-native'
import {FormInput, FormLabel, Icon} from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import style from '../StyleGuide/styles'
import Firebase from '../Firebase/Firebase'

let textStyle = {color: OFF_WHITE, fontWeight: '700', fontSize: 15, fontFamily: POPPINS_MEDIUM,}

export class Human extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerStyle: {
      backgroundColor: BLUE,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM,
    },
    headerLeft: null,
    headerRight: <Icon name={'clear'} iconStyle={style.icon} color={'white'}
                       onPress={() => navigation.goBack()}
                       underlayColor={BLUE}/>,
  })

  componentWillMount () {
    let user = Firebase.getAuth().currentUser
    this.setState({user})

    Firebase.getUserDetailsRef().once('value').then((snapshot) => {
      let salary = snapshot.val() && snapshot.val().salary
      this.setState({salary})
    })
  }

  updateSalary (text) {
    if (!text) return
    Firebase.getUserDetailsRef().set({
      salary: text.valueOf()
    })
  }

  signOut = () => {
    Firebase.getAuth().signOut()
  }

  render () {
    let {user, salary} = this.state
    user = user || {}
    salary = salary || 0

    return (
      <View style={{flex: 1, alignItems: 'center', backgroundColor: BLUE, height: '100%'}}>
        <FormLabel labelStyle={{color: OFF_WHITE, fontSize: 20, fontFamily: POPPINS}} fontFamily={POPPINS}>{user.displayName}</FormLabel>
        <FormLabel labelStyle={{color: OFF_WHITE, fontSize: 16, fontFamily: POPPINS, paddingBottom: 30}} fontFamily={POPPINS}>{user.email}</FormLabel>

        <FormLabel labelStyle={style.textStyle}
                   fontFamily={POPPINS}>HOURLY RATE</FormLabel>
        <FormInput defaultValue={`${salary}`}
                   labelStyle={style.textStyle}
                   inputStyle={{width: '50%', textAlign: 'center', color: OFF_WHITE, fontSize: 40}}
                   keyboardType={'numeric'}
                   onChangeText={(text) => this.updateSalary(text)}/>
        <Button title={"SIGN OUT"}
                onPress={this.signOut}
                textStyle={{...textStyle, color: OFF_WHITE, textAlign: 'center'}}
                buttonStyle={{
                  marginTop: 20,
                  borderColor: OFF_WHITE,
                  borderWidth: 1,
                  borderRadius: 10,
                  backgroundColor: BLUE,
                  justifyContent: 'center',
                  width: "100%"
                }}
        />
      </View>
    )
  }
}

export default Human