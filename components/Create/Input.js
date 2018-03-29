import React from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import { POPPINS } from '../StyleGuide/fonts'
import { OFF_WHITE } from '../StyleGuide/colors'

export const Input = (props) => {
  return (
    <View>
      <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>{props.labelText}</FormLabel>
      <FormInput
        onChangeText={(text) => props.onTextFieldChange(props.stateField, text)}
        containerStyle={{
          backgroundColor: 'transparent',
          borderColor: OFF_WHITE,
          borderWidth: .5,
          borderRadius: 5,
          margin: 10
        }}
        inputStyle={{
          color: OFF_WHITE,
          fontSize: 16,
          paddingLeft: 10
        }}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
    </View>
  )
}

