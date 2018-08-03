import React from 'react'
import {FormLabel} from 'react-native-elements'
import {View} from 'react-native'
import {POPPINS} from '../StyleGuide/fonts'
import StarRating from "react-native-star-rating";
import {OFF_WHITE} from "../StyleGuide/colors";

export const PoopRating = ({selected, onRatingChange}) => {
  const labelText = [
    'Kill Me',
    'Shouldn\'t have had spicy wings',
    'Average',
    'Quick and easy',
    'Did I even poop?']
  return <View>
    <FormLabel
      labelStyle={{color: OFF_WHITE, fontSize: 15, textAlign: 'center', paddingBottom: 5}}
      fontFamily={POPPINS}
    >
      {labelText[selected - 1]}
    </FormLabel>
    <StarRating
      maxStars={5}
      disabled={false}
      rating={selected}
      fullStarColor={"#FFCC00"}
      selectedStar={onRatingChange}
      containerStyle={{justifyContent: 'center', alignItems: 'center'}}
    />
  </View>
}

export default PoopRating