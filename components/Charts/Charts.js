import React, {Component} from 'react'
import Firebase from '../Firebase/Firebase'
import {ScrollView, View} from 'react-native'
import _ from 'lodash'
import PoopLineChart from './PoopLineChart'
import RatingPieChart from './RatingPieChart'
import Summary from './Summary'

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
      <ScrollView style={{flex: 1, paddingTop: 20, marginBottom: 20}}
                  contentContainerStyle={{alignItems: 'center'}}>
        <Summary poopData={this.state.poopData}/>
        <RatingPieChart poopData={this.state.poopData}/>
        <PoopLineChart poopData={this.state.poopData}/>
      </ScrollView>
    )
  }

}

export default Charts