import React from 'react'
import {View} from 'react-native'
import {FormInput, FormLabel} from 'react-native-elements'
import {OFF_WHITE} from '../StyleGuide/colors'
import {POPPINS} from "../StyleGuide/fonts";

export const Input = (props) => {
  return (
    <View>
      <FormLabel fontFamily={POPPINS}
                 labelStyle={{
                   color: OFF_WHITE,
                   fontSize: 15
                 }}>{props.labelText}</FormLabel>
      <FormInput
        onChangeText={(text) => props.onTextFieldChange(props.stateField, text)}
        containerStyle={{
          backgroundColor: 'transparent',
          borderBottomColor: OFF_WHITE
        }}
        inputStyle={{
          color: OFF_WHITE,
          paddingLeft: 10
        }}
        keyboardType={props.keyboardType}
        placeholderTextColor={OFF_WHITE}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  )
}

