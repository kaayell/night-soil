import React from 'react'
import { FormLabel, Rating } from 'react-native-elements'
import { View } from 'react-native'
import { POPPINS } from '../StyleGuide/fonts'
import { Stars } from 'react-native-stars-rating'

export const PoopRating = ({selected, onRatingChange}) => {
  const POOP = require('../../assets/poop-rating.png')

  const labelText = [
    'Kill Me',
    'Shouldn\'t have had spicy wings',
    'Average',
    'Quick and easy',
    'Did I even poop?']
  return <View style={{flex: 1}}>
    <FormLabel
      labelStyle={{color: 'white', fontSize: 20, textAlign: 'center', paddingBottom: 10}}
      fontFamily={POPPINS}
    >
      {labelText[selected - 1]}
    </FormLabel>
    <Stars
      isActive={true}
      rateMax={5}
      isHalfStarEnabled={false}
      onStarPress={onRatingChange}
      rate={3}
      size={60}
      style={{flex: 1, alignItems: 'center'}}
    />
  </View>

}

export default PoopRating