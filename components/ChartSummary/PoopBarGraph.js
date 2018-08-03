import React from "react";
import {BarChart} from "react-native-svg-charts";
import _ from "lodash";
import style from "../StyleGuide/styles";
import {TouchableOpacity, View} from "react-native";

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

  return (
    <TouchableOpacity style={{width: "95%"}} onPress={() => {
      navigation.navigate('BarGraphDetails')
    }}>
      <View style={style.cardStyle}>
        <BarChart
          style={{height: 200, width: 300, alignSelf: 'center'}}
          data={countOfPoops}
          svg={{fill}}
          gridMin={0}
          contentInset={{top: 30, bottom: 30}}
          showGrid={false}
        />
      </View>
    </TouchableOpacity>
  )
}

export default PoopBarGraph