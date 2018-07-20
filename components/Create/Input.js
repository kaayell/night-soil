import React from 'react'
import {View} from 'react-native'
import {FormInput, FormLabel} from 'react-native-elements'
import {POPPINS} from '../StyleGuide/fonts'
import {OFF_WHITE} from '../StyleGuide/colors'

export const Input = (props) => {
  return (
    <FormInput
      placeholder={props.labelText}
      onChangeText={(text) => props.onTextFieldChange(props.stateField, text)}
      containerStyle={{
        backgroundColor: 'transparent',
        borderColor: OFF_WHITE,
        borderWidth: 1,
        borderRadius: 10
      }}
      labelStyle={{
        color: OFF_WHITE,
        fontSize: 20
      }}
      inputStyle={{
        color: OFF_WHITE,
        fontSize: 20,
        paddingLeft: 10
      }}
      keyboardType={props.keyboardType}
      placeholderTextColor={OFF_WHITE}
      underlineColorAndroid='rgba(0,0,0,0)'
    />
  )
}

