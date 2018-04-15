import React from 'react'
import {PieChart} from 'react-native-svg-charts'
import _ from 'lodash'
import {Circle, G, Line, Text} from 'react-native-svg'

const RATING_COLORS = {
  '1': '#d7ccc8',
  '2': '#a1887f',
  '3': '#8d6e63',
  '4': '#6d4c41',
  '5': '#4e342e'
}

export const RatingPieChart = (props) => {
  let grouped = _.groupBy(props.poopData, 'poopRating')
  let pieData = _.map(grouped, (groupValue, groupKey) => {
    console.log(RATING_COLORS[groupKey])
    return {
      value: groupValue.length,
      svg: {
        fill: RATING_COLORS[groupKey],
        onPress: () => console.log('press'),
      },
      key: `${Math.random()}`,
    }
  });

  return <PieChart
    style={{height: 200, paddingTop: 20}}
    data={pieData}
    innerRadius={5}
    outerRadius={55}
    labelRadius={80}
  />
}

export default RatingPieChart