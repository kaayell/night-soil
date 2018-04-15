import React from 'react'
import { POPPINS } from '../StyleGuide/fonts'
import { OFF_WHITE } from '../StyleGuide/colors'
import { View } from 'react-native'
import { FormInput, FormLabel } from 'react-native-elements'

export const Duration = ({onTextFieldChange}) => {
  return <View style={{flex: 1}}>
    <FormLabel labelStyle={{color: 'white', fontSize: 16, paddingBottom: 10}} fontFamily={POPPINS}>
      Duration
    </FormLabel>
    <View style={{flex: 1, flexDirection: 'row', width: '100%'}}>
      <FormInput
        onChangeText={(text) => onTextFieldChange('durationMinutes', text)}
        containerStyle={{
          backgroundColor: 'transparent',
          borderColor: OFF_WHITE,
          borderWidth: .5,
          borderRadius: 5,
          height: '50%',
          width: '20%',
          marginRight: -10
        }}
        inputStyle={{
          color: OFF_WHITE,
          fontSize: 16,
          paddingLeft: 10
        }}
        underlineColorAndroid='rgba(0,0,0,0)'
      />
      <FormLabel labelStyle={{color: 'white', fontSize: 18}} fontFamily={POPPINS}>min</FormLabel>
    </View>
  </View>
}

export default Duration