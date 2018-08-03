import React, {Component} from 'react'
import {View, StatusBar, TouchableOpacity, Platform, Text} from "react-native";
import {PieChart} from "react-native-svg-charts";
import Firebase from "../Firebase/Firebase";
import {pieData, RATING_COLORS} from "../ChartHelpers/pie_chart_helper";
import {Icon} from "react-native-elements";
import {BLUE, OFF_WHITE} from "../StyleGuide/colors";
import _ from "lodash";
import {POPPINS} from "../StyleGuide/fonts";
import styles from "../StyleGuide/styles"

class ByRatingDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poopData: [],
      selectedSlice: null
    }
  }

  componentDidMount() {
    Firebase.getPoopsRef().on('value', snapshot => {
      let poopData = []
      snapshot.forEach(childSnapshot => {
        const poop = childSnapshot.val()
        poopData.push(poop)
      })
      this.setState({poopData})
    })
  }

  render() {
    let grouped = _.groupBy(this.state.poopData, 'poopRating')
    let pieData = _.map(grouped, (groupValue, groupKey) => {
      return {
        value: groupValue.length,
        svg: {
          fill: RATING_COLORS[groupKey]
        },
        key: `${Math.random()}`,
        onPress: () => this.setState({
          selectedSlice: {
            key: groupKey,
            value: groupValue.length,
            color: RATING_COLORS[groupKey]
          }
        })
      }
    })

    const paddingTop = Platform.OS === 'ios' ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10
    return (
      <View style={{flex: 1, backgroundColor: OFF_WHITE, paddingTop, height: "100%"}}>
        <TouchableOpacity style={{flexDirection: 'row', height: '5%', justifyContent: 'flex-end', paddingRight: 15}}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'close'} color={BLUE}/>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <PieChart
            style={{height: 300}}
            data={pieData}
            spacing={0}
            innerRadius={10}
            outerRadius={'95%'}
          />
          {
            this.state.selectedSlice &&
            <View style={{
              alignSelf: 'center',
              marginTop: 20,
              justifyContent: 'center',
              width: "85%",
              height: 200,
              backgroundColor: 'white',
              shadowOpacity: 0.5,
              shadowRadius: 5,
              shadowColor: this.state.selectedSlice.color,
              shadowOffset: {height: 0, width: 0},
            }}>
              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: POPPINS, fontSize: 20, color: this.state.selectedSlice.color}}>RATING</Text>
                <Text style={{fontFamily: POPPINS, fontSize: 30}}>{this.state.selectedSlice.key}</Text>
              </View>

              <View style={{alignItems: 'center'}}>
                <Text style={{fontFamily: POPPINS, fontSize: 20, color: this.state.selectedSlice.color}}>HOW MANY
                  TIMES</Text>
                <Text style={{
                  fontFamily: POPPINS,
                  fontSize: 30
                }}>{this.state.selectedSlice.value}</Text>
              </View>
            </View>
          }
        </View>
      </View>
    )
  }
}

export default ByRatingDetails