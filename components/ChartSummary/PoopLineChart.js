import React from 'react'
import {LineChart, XAxis, YAxis} from 'react-native-svg-charts'
import {Defs, LinearGradient, Stop} from 'react-native-svg'
import {TouchableOpacity, View} from 'react-native'
import _ from 'lodash'
import moment from 'moment'
import {cardStyle} from '../StyleGuide/styles'
import style from '../StyleGuide/styles'

const Gradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
      <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
      <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
    </LinearGradient>
  </Defs>
)

export const PoopLineChart = ({poopData, navigation}) => {

  let dateToCount = _.flatMap(_.groupBy(poopData, 'date'), (groupedData) => {
    return {
      date: groupedData[0].date,
      count: groupedData.length
    }
  })
  const maxCount = _.maxBy(dateToCount, 'count')

  let countOfPoops = _.flatMap(dateToCount, (data) => {
    return data.count
  })
  let dateOfPoops = _.flatMap(dateToCount, (data) => {
    return {date: moment(data.date, 'MM-DD-YYYY').format("MM-DD-YY")}
  })

  return (
    <TouchableOpacity style={{width: "95%"}} onPress={() => {
      navigation.navigate('ByTimeDetails', {'poopData': poopData})
    }}>
      <View style={style.cardStyle}>
        <View style={{height: 200, padding: 20, flexDirection: 'row'}}>
          <YAxis
            data={countOfPoops}
            style={{marginBottom: 30}}
            contentInset={{top: 10, bottom: 10}}
            svg={{fontSize: 10, fill: 'grey'}}
            numberOfTicks={maxCount.count}
          />
          <View style={{flex: 1, marginLeft: 10}}>
            <LineChart
              style={{flex: 1}}
              data={countOfPoops}
              contentInset={{top: 20, bottom: 20}}
              svg={{stroke: 'rgb(134, 65, 244)'}}
              showGrid={false}
            />
            <XAxis
              style={{marginHorizontal: -10, height: 30}}
              data={dateOfPoops}
              numberOfTicks={10}
              xAccessor={({item}) => item.date}
              contentInset={{left: 10, right: 10}}
              svg={{fontSize: 10, fill: 'grey'}}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default PoopLineChart