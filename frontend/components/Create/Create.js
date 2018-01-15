import React, { Component } from 'react'
import * as apiClient from '../../api/apiClient'
import { connect } from 'react-redux'
import { clearTime } from '../Timer/timer-actions'
import { Picker, View } from 'react-native'
import BaseView from '../BaseView/BaseView'
import { FormInput, FormLabel, Icon } from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import style from '../StyleGuide/icon-styles'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'

export class Create extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create',
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

    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDropDownChange = this.onDropDownChange.bind(this)
    this.onDateChange = this.onDateChange.bind(this)

    this.state = {
      bristolType: null,
      durationInMinutes: this.props.poopTime,
      comments: null,
      dateTimeInMilliseconds: null,

      errorTexts: {
        bristolTypeErrorText: '',
        durationInMinutesErrorText: '',
        commentsErrorText: '',
        dateTimeInMillisecondsErrorText: ''
      }
    }
  }

  handleSubmit () {
    let errorTexts = {}
    Object.entries(this.state).forEach(([key, value]) => {
      if (value === null) {
        errorTexts[`${key}ErrorText`] = 'This field is required'
      }
    })

    if (Object.keys(errorTexts).length !== 0) {
      this.setState({errorTexts: {...this.state.errorTexts, ...errorTexts}})
      return
    }

    apiClient.createLog({...this.state, ...{humanId: this.props.humanId}})
    this.props.clearTime()
    this.props.setActivePage('home')
  }

  onDropDownChange (event, index, value) {
    this.setState({
      bristolType: value,
      errorTexts: {...this.state.errorTexts, ...{bristolTypeErrorText: ''}}
    })
  }

  onDateChange (event, date) {
    this.setState({
      dateTimeInMilliseconds: date.getTime(),
      errorTexts: {...this.state.errorTexts, ...{dateTimeInMillisecondsErrorText: ''}}
    })
  }

  onTextFieldChange (field, value) {
    const errorObj = {}
    errorObj[`${field}ErrorText`] = ''
    const obj = {}
    obj[field] = value === '' ? null : value
    obj['errorTexts'] = {...this.state.errorTexts, ...errorObj}
    this.setState(obj)
  }

  render () {
    return (
      <View style={{backgroundColor: BLUE, height: '100%'}}>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Bristol Type</FormLabel>
        <Picker>
          <Picker.Item label="1 (Separate hard lumps)" value="1"/>
          <Picker.Item label="2 (Lumpy and sausage like)" value="2"/>
          <Picker.Item label="3 (Cracked sausage shape)" value="3"/>
          <Picker.Item label="4 (Smooth sausage)" value="4"/>
          <Picker.Item label="5 (Soft blobs with clear edges)" value="5"/>
          <Picker.Item label="6 (Mushy with ragged edges)" value="6"/>
          <Picker.Item label="7 (Liquid)" value="7"/>
        </Picker>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Duration</FormLabel>
        <FormInput onChangeText={this.onTextFieldChange.bind(this, 'durationInMinutes')}/>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Comments</FormLabel>
        <FormInput onChangeText={this.onTextFieldChange.bind(this, 'comments')}/>
        <FormLabel labelStyle={{color: 'white', fontSize: 16}} fontFamily={POPPINS}>Date</FormLabel>
      </View>
    )
  }
}

const mapStateToProps = state => {
  return {
    humanId: state.humanInfo.id,
    poopTime: state.poopTime
  }
}

export default connect(mapStateToProps, {clearTime})(Create)