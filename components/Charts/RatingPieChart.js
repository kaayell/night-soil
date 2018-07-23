import React from 'react'
import {PieChart} from 'react-native-svg-charts'
import {Text, TouchableHighlight, TouchableOpacity, View} from 'react-native'
import style from '../StyleGuide/styles'
import _ from 'lodash'
import {POPPINS} from "../StyleGuide/fonts";

const RATING_COLORS = {
  '1': '#d7ccc8',
  '2': '#a1887f',
  '3': '#8d6e63',
  '4': '#6d4c41',
  '5': '#4e342e'
}

export const RatingPieChart = ({poopData, navigation}) => {
  let grouped = _.groupBy(poopData, 'poopRating')
  let pieData = _.map(grouped, (groupValue, groupKey) => {
    return {
      value: groupValue.length,
      svg: {
        fill: RATING_COLORS[groupKey]
      },
      key: `${Math.random()}`,
    }
  })

  return <TouchableOpacity style={{width: "95%"}} onPress={() => {navigation.navigate('ByRatingDetails', {'poopData': poopData})}}>
    <View style={style.cardStyle}>
      <View style={{height: 40}}>
        <Text style={{fontFamily: POPPINS, color: 'black', textAlign: 'center', paddingTop: 10}}>POOPS BY RATING</Text>
      </View>
      <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flex: 2}}>
          <PieChart
            style={{height: 150}}
            data={pieData}
            spacing={0}
            innerRadius={10}
            outerRadius={'95%'}
          />
        </View>
        <View style={{flex: 1, height: "50%"}}>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><View
            style={{width: 20, height: 10, backgroundColor: RATING_COLORS['1']}}/><Text
            style={{paddingLeft: 10}}>1</Text></View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><View
            style={{width: 20, height: 10, backgroundColor: RATING_COLORS['2']}}/><Text
            style={{paddingLeft: 10}}>2</Text></View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><View
            style={{width: 20, height: 10, backgroundColor: RATING_COLORS['3']}}/><Text
            style={{paddingLeft: 10}}>3</Text></View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><View
            style={{width: 20, height: 10, backgroundColor: RATING_COLORS['4']}}/><Text
            style={{paddingLeft: 10}}>4</Text></View>
          <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}><View
            style={{width: 20, height: 10, backgroundColor: RATING_COLORS['5']}}/><Text
            style={{paddingLeft: 10}}>5</Text></View>
        </View>
      </View>
    </View>
  </TouchableOpacity>
}

export default RatingPieChart