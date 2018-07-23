import React from "react";
import {BarChart, Grid} from "react-native-svg-charts";
import _ from "lodash";
import style from "../StyleGuide/styles";
import {Text, View} from "react-native";

export const PoopBarGraph = ({poopData}) => {

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {
    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })

  const fill = 'rgb(134, 65, 244)'

  let countOfPoops = _.flatMap(dateToCount, (data) => {
    return data.count
  })

  return <View style={style.cardStyle}>
    <BarChart
      style={{height: 200, width: "100%"}}
      data={countOfPoops}
      svg={{fill}}
      contentInset={{top: 30, bottom: 30}}
    />
  </View>
}

export default PoopBarGraph