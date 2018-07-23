import React, {Component} from 'react'
import Firebase from '../Firebase/Firebase'
import {ScrollView} from 'react-native'
import _ from 'lodash'
import PoopLineChart from './PoopLineChart'
import RatingPieChart from './RatingPieChart'
import Summary from './Summary'
import {PoopBarGraph} from "./PoopBarGraph";

export class Charts extends Component {
  constructor(props) {
    super(props)

    this.state = {
      poopData: [],
      pieChartData: [],
      lineChartData: [],
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
    if (_.isEmpty(this.state.poopData)) return null

    return (
      <ScrollView style={{flex: 1, paddingTop: 10, paddingBottom: 40}}
                  contentContainerStyle={{alignItems: 'center', paddingBottom: 60}}>
        <Summary poopData={this.state.poopData}/>
        <RatingPieChart navigation={this.props.navigation} poopData={this.state.poopData}/>
        <PoopLineChart poopData={this.state.poopData}/>
        <PoopBarGraph poopData={this.state.poopData}/>
      </ScrollView>
    )
  }

}

export default Charts