import React from "react";
import _ from "lodash";
import style from "../StyleGuide/styles";
import {TouchableOpacity, View} from "react-native";
import {Calendar, CalendarList} from "react-native-calendars";
import {POPPINS} from "../StyleGuide/fonts";

export const PoopCalendar = ({poopData, navigation}) => {

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {
    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })

  let countOfPoops = _.flatMap(dateToCount, (data) => {
    return data.count
  })

  const axesSvg = {fontSize: 10, fill: 'grey'};


  return (
    <TouchableOpacity style={{width: "95%"}} onPress={() => {
      navigation.navigate('PoopCalendarDetails')
    }}>
      <View style={style.cardStyle}>
        <CalendarList
          horizontal={true}
          style={{
            height: 300,
          }}
          theme={{
            textDayFontFamily: POPPINS,
            textMonthFontFamily: POPPINS,
            textDayHeaderFontFamily: POPPINS,
            textDayFontSize: 10,
            textMonthFontSize: 10,
            textDayHeaderFontSize: 10
          }}/>
      </View>
    </TouchableOpacity>
  )
}

export default PoopCalendar