import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as api from '../../api/apiClient'
import { setHumanInfo } from './human-actions'
import { View } from 'react-native'
import { FormInput, FormLabel, Icon } from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import style from '../StyleGuide/icon-styles'
import formStyle from './Human.style'

export class Human extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Profile',
    headerStyle: {
      backgroundColor: BLUE,
      borderBottomWidth: 0
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM
    },
    headerLeft: null,
    headerRight: <Icon name={'clear'} iconStyle={style.icon} color={'white'}
                       onPress={() => navigation.goBack()} underlayColor={BLUE}/>
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
      <View style={{flex: 1, backgroundColor: BLUE, height: '100%'}}>
        <FormLabel labelStyle={{color: "white", fontSize: 16}} fontFamily={POPPINS}>Name</FormLabel>
        <FormInput disabled value={`${this.props.humanInfo.firstName} ${this.props.humanInfo.lastName}`}/>
        <FormLabel labelStyle={{color: "white", fontSize: 16}} fontFamily={POPPINS}>Email</FormLabel>
        <FormInput disabled value={this.props.humanInfo.email}/>
        <FormLabel labelStyle={{color: "white", fontSize: 16}} fontFamily={POPPINS}>Hourly Rate</FormLabel>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    humanInfo: state.humanInfo
  }
}

export default connect(mapStateToProps, {setHumanInfo})(Human)