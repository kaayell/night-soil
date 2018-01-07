import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../../api/apiClient'
import { setHumanInfo } from './human-actions'
import { Image, View } from 'react-native'
import BaseView from '../BaseView/BaseView'
import { FormInput, FormLabel } from 'react-native-elements'

export class Human extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    tabBarIcon: ({tintColor}) =>
      <Image source={require('../../assets/icons/face_grey_24x24.png')}
             style={{tintColor: tintColor}}/>,
    headerStyle: {
      backgroundColor: '#9AC0CD'
    },
    headerTitleStyle: {
      color: '#fafafa',
      fontFamily: 'roboto-medium'
    }
  })

  constructor (props) {
    super(props)

    this.state = {
      hourlyRate: ''
    }
  }

  componentWillReceiveProps (nextProps) {
    this.setState({hourlyRate: nextProps.humanInfo.hourlyRate})
  }

  componentWillUnmount () {
    if (this.props.humanInfo.hourlyRate !== this.state.hourlyRate) {
      let humanInfo = {...this.props.humanInfo, ...this.state}
      api.updateHuman(humanInfo)
      this.props.setHumanInfo(humanInfo)
    }
  }

  onValueChange (field, event) {
    const obj = {}
    obj[field] = event
    this.setState(obj)
  }

  render () {
    return (
      <BaseView>
        <FormLabel>Name</FormLabel>
        <FormInput disabled value={`${this.props.humanInfo.firstName} ${this.props.humanInfo.lastName}`}/>
        <FormLabel>Email</FormLabel>
        <FormInput disabled value={this.props.humanInfo.email}/>
        <FormLabel>Hourly Rate</FormLabel>
        <FormInput value={this.props.humanInfo.hourlyRate} onChangeText={this.onValueChange.bind(this, "hourlyRate")}/>
      </BaseView>
    )
  }
}

const mapStateToProps = state => {
  return {
    humanInfo: state.humanInfo
  }
}

export default connect(mapStateToProps, {setHumanInfo})(Human)