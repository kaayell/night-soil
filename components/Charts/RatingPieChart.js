import React from 'react'
import { PieChart } from 'react-native-svg-charts'
import { Text } from 'react-native-svg'
import { View } from 'react-native'
import style from '../StyleGuide/styles'
import _ from 'lodash'

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
    return {
      value: groupValue.length,
      svg: {
        fill: RATING_COLORS[groupKey],
        onPress: () => console.log('press'),
      },
      key: `${Math.random()}`,
    }
  })

  const Labels = ({slices, height, width}) => {
    return slices.map((slice, index) => {
      const {labelCentroid, pieCentroid, data} = slice
      return (
        <Text
          key={index}
          x={pieCentroid[0]}
          y={pieCentroid[1]}
          fill={'white'}
          textAnchor={'middle'}
          alignmentBaseline={'middle'}
          fontSize={24}
          stroke={'black'}
          strokeWidth={0.2}
        >
          {data.amount}
        </Text>
      )
    })
  }

  return <View
    style={style.cardStyle}>
    <PieChart
      style={{height: 150}}
      data={pieData}
      spacing={0}
      innerRadius={10}
      outerRadius={'95%'}
    >
      <Labels/>
    </PieChart>
  </View>
}

export default RatingPieChart