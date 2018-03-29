import React from 'react'
import {PieChart} from 'react-native-svg-charts'
import _ from 'lodash'
import {Circle, G, Line, Text} from 'react-native-svg'

const BRISTOL_COLORS = {
  '1': '#d7ccc8',
  '2': '#a1887f',
  '3': '#8d6e63',
  '4': '#6d4c41',
  '5': '#4e342e',
  '6': '#3e2723',
  '7': '#212121',
}

export const BristolPieChart = (props) => {
  let grouped = _.groupBy(props.poopData, 'bristolType')
  let pieData = _.map(grouped, (groupValue, groupKey) => {
    return {
      value: groupValue.length,
      color: BRISTOL_COLORS[groupKey],
      key: `${Math.random()}`,
    }
  });

  return <PieChart
    style={{height: 200, paddingTop: 20}}
    data={pieData}
    innerRadius={5}
    outerRadius={55}
    labelRadius={80}
    renderDecorator={({item, pieCentroid, labelCentroid, index}) => (
      <G key={index}>
        <Line
          x1={labelCentroid[0]}
          y1={labelCentroid[1]}
          x2={pieCentroid[0]}
          y2={pieCentroid[1]}
          stroke={item.color}
        />
        <Circle
          cx={labelCentroid[0]}
          cy={labelCentroid[1]}
          r={10}
          fill={item.color}
        />
      </G>)}
  />
}

export default BristolPieChart