import React from "react";
import {BarChart, XAxis} from "react-native-svg-charts";
import _ from "lodash";
import style from "../StyleGuide/styles";
import {Text, TouchableOpacity, View} from "react-native";
import {POPPINS} from "../StyleGuide/fonts";

export const PoopBarGraph = ({poopData, navigation}) => {

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {
    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })

  const fill = 'rgb(141, 110, 99)'

  let countOfPoops = _.flatMap(dateToCount, (data) => {
    return data.count
  })

  const axesSvg = { fontSize: 10, fill: 'grey' };

  console.log(dateToCount)

  return (
    <TouchableOpacity style={{width: "95%"}} onPress={() => {
      navigation.navigate('BarGraphDetails')
    }}>
      <View style={style.cardStyle}>
        <View style={{paddingTop: 30}}>
          <Text style={{fontFamily: POPPINS, color: 'black', textAlign: 'left', paddingLeft: 10, paddingTop: 10}}>
            POOPS PER DAY
          </Text>
        </View>
        <BarChart
          style={{height: 150, width: 300, alignSelf: 'center'}}
          data={countOfPoops}
          svg={{fill}}
          gridMin={0}
          contentInset={{top: 30, bottom: 30}}
          showGrid={false}
        />
        <XAxis data={countOfPoops}
               svg={axesSvg}
               style={{ marginHorizontal: 40, height: 30 }}
               formatLabel={(value, index) => index}
               contentInset={{ left: 10, right: 10 }}/>
      </View>
    </TouchableOpacity>
  )
}

export default PoopBarGraph