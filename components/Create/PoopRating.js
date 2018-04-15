import React from 'react'
import { FormLabel } from 'react-native-elements'
import { View } from 'react-native'
import { POPPINS } from '../StyleGuide/fonts'
import { Rating } from 'react-native-ratings'

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
    <Rating
      type={'custom'}
      ratingImage={POOP}
      ratingColor={'rgb(101,67,33)'}
      ratingBackgroundColor={'rgba(101,67,33, .5)'}
      ratingCount={5}
      imageSize={50}
      onFinishRating={onRatingChange}
      style={{flex: 1, alignItems: 'center'}}
    />
  </View>

}

export default PoopRating