import React from 'react'
import { Text, TouchableOpacity, View, } from 'react-native'
import { Button } from 'react-native-elements'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'

const labelStyle = {fontSize: 10, color: OFF_WHITE}

export const BristolType = (props) => {
  const backgroundColor = props.selectedBristolType === props.type
    ? OFF_WHITE
    : 'transparent'
  const fontColor = props.selectedBristolType === props.type ? BLUE : OFF_WHITE
  return (
    <Button
      title={`${props.type}: ${props.label1} ${props.label2 || ''}`}
      buttonStyle={{
        backgroundColor: backgroundColor,
        width: 90,
        height: 45,
        borderColor: OFF_WHITE,
        borderWidth: .5,
        borderRadius: 5,
      }}
      textStyle={
        {
          ...labelStyle,
          color: fontColor,
        }
      }
      onPress={() => {
        console.log(props.type)
        props.setPoopRating(props.type)
      }}/>)
}