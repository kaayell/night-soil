import React from 'react'
import { Text, View } from 'react-native'
import { FormLabel } from 'react-native-elements'
import { POPPINS } from '../StyleGuide/fonts'
import { RadioButton, RadioGroup } from 'react-native-flexi-radio-button'

export const BristolTypeSelection = (props) => {
  return (
    <View>
      <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Bristol Type</FormLabel>
      <RadioGroup onSelect={(index, value) => props.setBristolType(value)}>
        <RadioButton value={'1'}><Text>1 (Separate hard lumps)</Text></RadioButton>
        <RadioButton value={'2'}><Text>2 (Lumpy and sausage like)</Text></RadioButton>
        <RadioButton value={'3'}><Text>3 (Cracked sausage shape)</Text></RadioButton>
        <RadioButton value={'4'}><Text>4 (Smooth sausage)</Text></RadioButton>
        <RadioButton value={'5'}><Text>5 (Soft blobs with clear edges)</Text></RadioButton>
        <RadioButton value={'6'}><Text>6 (Mushy with ragged edges)</Text></RadioButton>
        <RadioButton value={'7'}><Text>7 (Liquid)</Text></RadioButton>
      </RadioGroup>
    </View>
  )
}