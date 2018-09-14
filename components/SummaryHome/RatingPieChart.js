import React from 'react'
import {PieChart} from 'react-native-svg-charts'
import {Text, TouchableOpacity, View} from 'react-native'
import style from '../StyleGuide/styles'
import {POPPINS} from "../StyleGuide/fonts";
import {pieData, RATING_COLORS} from "../ChartHelpers/pie_chart_helper";

export const RatingPieChart = ({poopData, navigation}) => {
  return (
    <TouchableOpacity style={{width: "95%"}} onPress={() => {
      navigation.navigate('ByRatingDetails', {'poopData': poopData})
    }}>
      <View style={style.cardStyle}>
        <View style={{height: 40}}>
          <Text style={{fontFamily: POPPINS, color: 'black', textAlign: 'left', paddingLeft: 10, paddingTop: 10}}>POOPS BY
            RATING</Text>
        </View>
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{flex: 2}}>
            <PieChart
              style={{height: 150}}
              data={pieData(poopData)}
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
    </TouchableOpacity>)
}

export default RatingPieChart