import React, {Component} from 'react'
import {Platform, StatusBar, Text, TouchableOpacity, View} from "react-native";
import Firebase from "../Firebase/Firebase";
import {Divider, Icon} from "react-native-elements";
import {BLUE, OFF_WHITE} from "../StyleGuide/colors";
import _ from "lodash";
import {Agenda} from "react-native-calendars";
import moment from "moment";
import StarRating from "react-native-star-rating";

class PoopCalendarDetails extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poopData: []
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

  renderItem(item) {
    return <View style={{flex: 1, backgroundColor: OFF_WHITE, paddingLeft: 10, justifyContent: 'center', width: "95%", marginTop: 20}}>
      <StarRating
        maxStars={5}
        disabled={true}
        starSize={20}
        rating={item.poopRating}
        fullStarColor={"#FFCC00"}
        containerStyle={{alignItems: 'center', width: 80}}
      />
      <Text>{item.text}</Text>
    </View>
  }

  render() {
    const items = {}
    _.forEach(this.state.poopData, data => {
      return items[moment(data.date, 'MM-DD-YYYY').format('YYYY-MM-DD')] = [{
        text: `${data.durationMinutes} min`,
        poopRating: data.poopRating
      }]
    })

    const markedDates = {}
    _.forEach(this.state.poopData, data => {
      return markedDates[moment(data.date, 'MM-DD-YYYY').format('YYYY-MM-DD')] = {marked: true}
    })

    const paddingTop = Platform.OS === 'ios' ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10
    return (
      <View style={{flex: 1, backgroundColor: OFF_WHITE, paddingTop, height: "100%"}}>
        <TouchableOpacity style={{flexDirection: 'row', height: '5%', justifyContent: 'flex-end', paddingRight: 15}}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'close'} color={BLUE}/>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Agenda
            items={items}
            markedDates={markedDates}
            renderItem={(item) => this.renderItem(item)}
            rowHasChanged={(r1, r2) => {
              return r1.text !== r2.text
            }}
          />
        </View>
      </View>
    )
  }
}

export default PoopCalendarDetails