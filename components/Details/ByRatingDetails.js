import React from 'react'
import {View} from "react-native";
import RatingPieChart from "../Charts/RatingPieChart";

const ByRatingDetails = (props) => {
  console.log(props)
  return (
    <View>
    <RatingPieChart/>
    </View>
  )
}

export default ByRatingDetails