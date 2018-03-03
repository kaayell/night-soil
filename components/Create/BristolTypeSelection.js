import React from 'react'
import { View, } from 'react-native'
import { FormLabel } from 'react-native-elements'
import { POPPINS } from '../StyleGuide/fonts'
import { BristolType } from './BristolType'

export const BristolTypeSelection = (props) => {
  const buttonGroup1 = [
    <BristolType {...props} key={'1'} type={1} label1={'Separate hard'}
                 label2={'lumps'}/>,
    <BristolType {...props} key={'2'} type={2} label1={'Lumpy and'}
                 label2={'sausage like'}/>,
    <BristolType {...props} key={'3'} type={3} label1={'Cracked'}
                 label2={'sausage shape'}/>,
  ]
  const buttonGroup2 = [
    <BristolType {...props} key={'4'} type={4} label1={'Smooth sausage'}/>,
    <BristolType {...props} key={'5'} type={5} label1={'Soft blobs'}
                 label2={'with clear edges'}/>,
    <BristolType {...props} key={'6'} type={6} label1={'Mushy with'}
                 label2={'ragged edges'}/>,
  ]

  let viewStyle = {
    flexDirection: 'row', flexWrap: 'wrap',
    justifyContent: 'center', paddingTop: 10,
  }
  return (
    <View>
      <FormLabel labelStyle={{color: 'white', fontSize: 16}}
                 fontFamily={POPPINS}>Bristol Type</FormLabel>
      <View style={viewStyle}>
        {buttonGroup1.map((image) => {return image})}
      </View>
      <View style={viewStyle}>
        {buttonGroup2.map((image) => {return image})}
      </View>
      <View style={viewStyle}>
        <BristolType {...props} key={'7'} type={7} label1={'Liquid'}/>
      </View>
    </View>
  )
}