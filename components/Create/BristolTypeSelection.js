import React from 'react'
import { View, } from 'react-native'
import { FormLabel } from 'react-native-elements'
import { POPPINS } from '../StyleGuide/fonts'
import { BristolType } from './BristolType'

export const BristolTypeSelection = (props) => {
  const buttonGroup1 = [
    <BristolType key={'1'} label1={'Separate hard'} label2={'lumps'}/>,
    <BristolType key={'2'} label1={'Lumpy and'} label2={'sausage like'}/>,
    <BristolType key={'3'} label1={'Cracked'} label2={'sausage shape'}/>,
  ]
  const buttonGroup2 = [
    <BristolType key={'4'} label1={'Smooth sausage'}/>,
    <BristolType key={'5'} label1={'Soft blobs'} label2={'with clear edges'}/>,
    <BristolType key={'6'} label1={'Mushy with'} label2={'ragged edges'}/>,
    <BristolType key={'7'} label1={'Liquid'}/>,
  ]

  return (
    <View>
      <FormLabel labelStyle={{color: 'white', fontSize: 16}}
                 fontFamily={POPPINS}>Bristol Type</FormLabel>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {buttonGroup1.map((image) => {return image})}
      </View>
      <View style={{flexDirection: 'row', justifyContent: 'center'}}>
        {buttonGroup2.map((image) => {return image})}
      </View>
    </View>
  )
}