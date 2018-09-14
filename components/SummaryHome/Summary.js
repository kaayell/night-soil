import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import style from '../StyleGuide/styles'
import _ from 'lodash'
import {Text} from 'react-native-elements'
import {POPPINS} from '../StyleGuide/fonts'
import {BLUE} from "../StyleGuide/colors";

export const Summary = ({poopData, navigation}) => {
  const howMuchMade = _.sum(_.flatMap(poopData, (poop) => {
    return poop.atWork && ((poop.salary / 60) * parseInt(poop.durationMinutes))
  })) || 0

  const averageTime = _.mean(_.flatMap(poopData, (poop) => {
    return parseInt(poop.durationMinutes)
  })) || 0

  return (
    <View style={style.cardStyle}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: POPPINS}}>MONEY MADE POOPIN</Text>
          <Text style={{fontFamily: POPPINS, fontSize: 40, color: 'green'}}>${howMuchMade.toFixed(2)}</Text>
        </View>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: POPPINS}}>POOPS RECORDED</Text>
          <Text style={{fontFamily: POPPINS, fontSize: 40, color: 'green'}}>{poopData.length}</Text>
        </View>
      </View>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontFamily: POPPINS}}>AVERAGE TIME SPENT</Text>
          <Text style={{fontFamily: POPPINS, fontSize: 40, color: 'green'}}>
            {averageTime.toFixed(0)}<Text style={{fontSize: 20}}>min</Text></Text>
        </View>
      </View>
    </View>
  )
}
export default Summary