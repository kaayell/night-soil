import React, { Component } from 'react'
import Firebase from '../Firebase/Firebase'
import { View } from 'react-native'
import _ from 'lodash'
import PoopLineChart from './PoopLineChart'
import RatingPieChart from './RatingPieChart'
import Summary from './Summary'

export class Charts extends Component {
  constructor (props) {
    super(props)

    this.state = {
      poopData: [],
      pieChartData: [],
      lineChartData: [],
    }
  }

  componentDidMount () {
    Firebase.getPoopsRef().on('value', snapshot => {
      let poopData = []
      snapshot.forEach(childSnapshot => {
        const poop = childSnapshot.val()
        poopData.push(poop)
      })
      this.setState({poopData})
    })
  }

  render () {
    if (_.isEmpty(this.state.poopData)) return null

    return (
      <View style={{flex: 1, alignItems: 'center', paddingTop: 20}}>
        <Summary poopData={this.state.poopData}/>
        <RatingPieChart poopData={this.state.poopData}/>
        <PoopLineChart poopData={this.state.poopData}/>
      </View>
    )
  }

}

export default Charts