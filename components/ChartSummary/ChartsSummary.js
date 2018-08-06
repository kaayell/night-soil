import React, {Component} from 'react'
import Firebase from '../Firebase/Firebase'
import {ScrollView} from 'react-native'
import _ from 'lodash'
import RatingPieChart from './RatingPieChart'
import Summary from './Summary'

export class ChartsSummary extends Component {
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
    if (_.isEmpty(this.state.poopData)) return null

    return (
      <ScrollView style={{flex: 1, paddingTop: 10, paddingBottom: 40}}
                  contentContainerStyle={{alignItems: 'center', paddingBottom: 60}}>
        <Summary navigation={this.props.navigation} poopData={this.state.poopData}/>
        <RatingPieChart navigation={this.props.navigation} poopData={this.state.poopData}/>
      </ScrollView>
    )
  }

}

export default ChartsSummary