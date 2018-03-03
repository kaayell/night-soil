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
    if (!text) return;
    Firebase.getUserDetailsRef().set({
      salary: text.valueOf()
    })
  }

  render () {
    let {user, salary} = this.state
    user = user || {}
    salary = salary || 0

    return (
      <View style={{flex: 1, backgroundColor: BLUE, height: '100%'}}>
        <FormLabel labelStyle={style.textStyle}
                   fontFamily={POPPINS}>Name</FormLabel>
        <FormInput editable={false} value={`${user.displayName}`}
                   labelStyle={style.textStyle}
                   inputStyle={style.textStyle}
        />

        <FormLabel labelStyle={style.textStyle}
                   inputStyle={style.textStyle}
                   fontFamily={POPPINS}>Email
        </FormLabel>
        <FormInput editable={false} value={user.email}
                   labelStyle={style.textStyle}
                   inputStyle={style.textStyle}/>

        <FormLabel labelStyle={style.textStyle}
                   fontFamily={POPPINS}>Hourly Rate</FormLabel>
        <FormInput defaultValue={`${salary}`}
                   labelStyle={style.textStyle}
                   inputStyle={style.textStyle}
                   keyboardType={'numeric'}
                   onChangeText={(text) => this.updateSalary(text)}/>
      </View>
    )
  }
}

export default Human