import moment from "moment/moment";
import _ from "lodash";
import {BarChart, Grid} from "react-native-svg-charts";
import React from "react";

export const PoopBarGraph = ({poopData}) => {

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {
    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })

  const fill = 'rgb(134, 65, 244)'

  let countOfPoops = _.flatMap(dateToCount, (data) => {return data.count})
  console.log(countOfPoops)
  let dateOfPoops = _.flatMap(dateToCount, (data) => {return moment(data.date, 'MM-DD-YYYY')})

  return <BarChart
    style={{ height: 200 }}
    data={ countOfPoops }
    svg={{ fill }}
    contentInset={{ top: 30, bottom: 30 }}
  >
    <Grid/>
  </BarChart>
}

export default PoopBarGraph