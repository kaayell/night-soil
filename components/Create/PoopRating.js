import React from 'react'
import {FormLabel} from 'react-native-elements'
import {View} from 'react-native'
import {POPPINS} from '../StyleGuide/fonts'
import StarRating from "react-native-star-rating";

export const PoopRating = ({selected, onRatingChange}) => {
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
    <StarRating
      maxStars={5}
      disabled={false}
      rating={selected}
      fullStarColor={"FFCC00"}
      selectedStar={onRatingChange}
      containerStyle={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
    />
  </View>
}

export default PoopRating