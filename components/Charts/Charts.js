import React, { Component } from 'react'
import Firebase from '../Firebase/Firebase'
import { View } from 'react-native'
import { Defs, LinearGradient, Stop } from 'react-native-svg'
import BristolPieChart from './BristolPieChart'

const Gradient = () => (
  <Defs key={'gradient'}>
    <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
      <Stop offset={'0%'} stopColor={'rgb(134, 65, 244)'}/>
      <Stop offset={'100%'} stopColor={'rgb(66, 194, 244)'}/>
    </LinearGradient>
  </Defs>
)

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
    return (
      <View style={{flex: 1}}>
        <BristolPieChart poopData={this.state.poopData}/>
        {/*<LineChart*/}
          {/*style={{height: 200}}*/}
          {/*data={data}*/}
          {/*xAccessor={}*/}
          {/*yAccessor={}*/}
          {/*contentInset={{top: 20, bottom: 20}}*/}
          {/*svg={{*/}
            {/*strokeWidth: 2,*/}
            {/*stroke: 'url(#gradient)',*/}
          {/*}}*/}
          {/*extras={[Gradient]}*/}
          {/*showGrid={false}*/}
        {/*/>*/}
      </View>
    )
  }

}

export default Charts