import React from 'react'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'
import { POPPINS } from '../StyleGuide/fonts'

export const Input = (props) => {
  return (
    <View>
      <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>{props.labelText}</FormLabel>
      <FormInput onChangeText={(text) => props.onTextFieldChange(props.stateField, text)}/>
    </View>
  )
}

