import React from 'react'
import { Text, TouchableOpacity, View, } from 'react-native'

const labelStyle = {fontSize: 10, color: 'white'}

export const BristolType = (props) => {
  return (
    <TouchableOpacity style={{
      padding: 5,
      borderWidth: .5,
      borderRadius: 5,
      borderColor: 'white',
      margin: 5,
    }}>
      <View style={{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={labelStyle}>{props.label1}</Text>
        {props.label2 && <Text style={labelStyle}>{props.label2}</Text>}
      </View>
    </TouchableOpacity>)
}