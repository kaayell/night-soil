import React from "react";
import _ from "lodash";
import style from "../StyleGuide/styles";
import {TouchableOpacity, View} from "react-native";
import {Calendar, CalendarList} from "react-native-calendars";
import {POPPINS} from "../StyleGuide/fonts";
import {BLUE} from "../StyleGuide/colors";
import moment from "moment/moment";

export const PoopCalendar = ({poopData, navigation}) => {

  const items = {}
  _.forEach(poopData, data => {
    return items[moment(data.date, 'MM-DD-YYYY').format('YYYY-MM-DD')] = []
  })

  const markedDates = {}
  _.forEach(poopData, data => {
    return markedDates[moment(data.date, 'MM-DD-YYYY').format('YYYY-MM-DD')] = {
      marked: true,
      selected: true,
      selectedColor: BLUE
    }
  })

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {

    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })

  return (
    <View style={{width: "95%"}}>
      <View style={{
        marginTop: 20,
        justifyContent: 'center',
        width: "100%",
        height: 400,
        backgroundColor: 'white',
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: BLUE,
        shadowOffset: {height: 0, width: 0},
      }}>
        <Calendar
          horizontal={true}
          style={{
            height: 330,
          }}
          markedDates={markedDates}
          theme={{
            textDayFontFamily: POPPINS,
            textMonthFontFamily: POPPINS,
            textDayHeaderFontFamily: POPPINS,
            textDayFontSize: 10,
            textMonthFontSize: 10,
            textDayHeaderFontSize: 10,
            arrowColor: BLUE
          }}/>
      </View>
    </View>
  )
}

export default PoopCalendar