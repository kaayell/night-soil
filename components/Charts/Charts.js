import React, { Component } from 'react'
import Firebase from '../Firebase/Firebase'
import { View } from 'react-native'
import BristolPieChart from './BristolPieChart'
import BristolLineChart from './BristolLineChart'
import _ from 'lodash'

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
      <View style={{flex: 1}}>
        <BristolPieChart poopData={this.state.poopData}/>
        <BristolLineChart poopData={this.state.poopData}/>
      </View>
    )
  }

}

export default Charts