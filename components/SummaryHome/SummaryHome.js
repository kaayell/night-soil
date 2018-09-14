import React, {Component} from 'react'
import Firebase from '../Firebase/Firebase'
import {ScrollView} from 'react-native'
import _ from 'lodash'
import RatingPieChart from './RatingPieChart'
import Summary from './Summary'
import {BLUE} from "../StyleGuide/colors";
import {POPPINS} from "../StyleGuide/fonts";
import {FormLabel} from "react-native-elements";
import PoopBarGraph from "./PoopBarGraph";
import PoopLineChart from "./PoopLineChart";
import PoopCalendar from "../Calendar/PoopCalendar";

export class SummaryHome extends Component {
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
    if (_.isEmpty(this.state.poopData)) {
      return (
        <FormLabel labelStyle={{color: BLUE, fontSize: 15, fontFamily: POPPINS, textAlign: 'center'}} fontFamily={POPPINS}>
          PLEASE START BY RECORDING A POOP!
        </FormLabel>
      )
    }

    return (
      <ScrollView style={{flex: 1, paddingTop: 10, paddingBottom: 40}}
                  contentContainerStyle={{alignItems: 'center', paddingBottom: 60}}>
        <Summary navigation={this.props.navigation} poopData={this.state.poopData}/>
        <PoopCalendar navigation={this.props.navigation} poopData={this.state.poopData}/>
        <RatingPieChart navigation={this.props.navigation} poopData={this.state.poopData}/>
        <PoopLineChart navigation={this.props.navigation} poopData={this.state.poopData}/>
      </ScrollView>
    )
  }

}

export default SummaryHome