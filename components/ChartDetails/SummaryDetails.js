import React, {Component} from 'react'
import {Platform, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import Firebase from "../Firebase/Firebase";
import {Icon, List, ListItem} from "react-native-elements";
import {BLUE, OFF_WHITE} from "../StyleGuide/colors";
import _ from "lodash";
import {POPPINS} from "../StyleGuide/fonts";
import StarRating from "react-native-star-rating";

class SummaryDetails extends Component {
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

  render() {
    const howMuchMade = _.sum(_.flatMap(this.state.poopData, (poop) => {
      return poop.atWork && ((poop.salary / 60) * parseInt(poop.durationMinutes))
    }))

    const averageTime = _.mean(_.flatMap(this.state.poopData, (poop) => {
      return parseInt(poop.durationMinutes)
    }))

    const paddingTop = Platform.OS === 'ios' ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10
    return (
      <View style={{flex: 1, backgroundColor: OFF_WHITE, paddingTop, height: "100%"}}>
        <TouchableOpacity style={{flexDirection: 'row', height: '5%', justifyContent: 'flex-end', paddingRight: 15}}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'close'} color={BLUE}/>
        </TouchableOpacity>
        <View style={{
          marginTop: 20,
          justifyContent: 'center',
          width: "95%",
          height: 200,
          backgroundColor: 'white',
          shadowOpacity: 0.5,
          shadowRadius: 5,
          shadowColor: BLUE,
          shadowOffset: {height: 0, width: 0},
          alignSelf: 'center'
        }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: POPPINS}}>MONEY MADE POOPIN</Text>
              <Text style={{fontFamily: POPPINS, fontSize: 40, color: 'green'}}>${howMuchMade.toFixed(2)}</Text>
            </View>
            <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: POPPINS}}>POOPS RECORDED</Text>
              <Text style={{fontFamily: POPPINS, fontSize: 40, color: 'green'}}>{this.state.poopData.length}</Text>
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
        <ScrollView>
          <List containerStyle={{marginBottom: 20}}>
            {
              this.state.poopData.slice(0).reverse().map((data, i) => (
                <ListItem
                  key={i}
                  title={
                    <StarRating
                      maxStars={5}
                      disabled={true}
                      starSize={20}
                      rating={data.poopRating}
                      fullStarColor={"#FFCC00"}
                      containerStyle={{alignItems: 'center', width: 80, paddingLeft: 10}}
                    />}
                  containerStyle={{padding: 10, height: 60}}
                  hideChevron={true}
                  disabled={true}
                  fontFamily={POPPINS}
                  subtitle={`${data.durationMinutes} min`}
                  rightTitle={data.date}
                  topDivider={false}
                />
              ))
            }
          </List>
        </ScrollView>
      </View>
    )
  }
}

export default SummaryDetails