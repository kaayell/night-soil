import React, {Component} from 'react'
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native'
import {Button, FormLabel, Icon} from 'react-native-elements'
import {POPPINS, POPPINS_MEDIUM} from '../StyleGuide/fonts'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import {Input} from './Input'
import PoopRating from './PoopRating'

let textStyle = {color: OFF_WHITE, fontWeight: '700', fontSize: 15, fontFamily: POPPINS_MEDIUM,}

export default class Create extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setPoopRating = this.setPoopRating.bind(this)
    this.onTextFieldChange = this.onTextFieldChange.bind(this)

    this.state = {
      poopRating: 3,
      duration: null,
      comments: null,
      date: moment().format('MM-DD-YYYY'),
      atWork: false
    }
  }

  handleSubmit() {
    Firebase.getUserDetailsRef().once('value').then((snapshot) => {
      let salary = snapshot.val() && snapshot.val().salary
      Firebase.savePoop({
        ...this.state,
        salary
      })
    })
    this.props.closeModal()
  }

  setPoopRating(poopRating) {
    this.setState({poopRating})
  }

  onTextFieldChange(field, value) {
    const obj = {}
    obj[field] = value === '' ? null : value
    this.setState(obj)
  }

  onWorkStatusChange() {
    this.setState({atWork: !this.state.atWork})
  }

  render() {
    return (
      <View style={{backgroundColor: BLUE, height: 400}}>
        {this.renderRating()}
        <View style={{flex: 1, flexDirection: 'column'}}>
          {this.renderDuration()}
          {this.renderDate()}
        </View>
        <View style={{flex: 1}}>
          {this.renderWorkToggle()}
          {this.renderAddButton()}
        </View>
      </View>
    )
  }

  renderAddButton() {
    return <Button
      title='ADD'
      onPress={() => this.handleSubmit()}
      textStyle={{color: OFF_WHITE, fontWeight: '700', fontSize: 15}}
      buttonStyle={{
        marginTop: 5,
        backgroundColor: 'transparent',
        borderColor: OFF_WHITE,
        borderWidth: 1,
        borderRadius: 10,
      }}
    />;
  }

  renderWorkToggle() {
    const atWorkBackgroundColor = this.state.atWork ? OFF_WHITE : 'transparent'
    const atWorkFontColor = this.state.atWork ? BLUE : OFF_WHITE

    return <Button title={"I'm at work"}
                   onPress={() => this.onWorkStatusChange()}
                   textStyle={{...textStyle, color: atWorkFontColor, textAlign: 'center'}}
                   buttonStyle={{
                     marginTop: 5,
                     borderColor: OFF_WHITE,
                     borderWidth: 1,
                     borderRadius: 10,
                     backgroundColor: atWorkBackgroundColor
                   }}
    />;
  }

  renderDate() {
    return <View>
      <FormLabel fontFamily={POPPINS}
                 labelStyle={{
                   color: OFF_WHITE,
                   fontSize: 15
                 }}>Date</FormLabel>
      <DatePicker showIcon={false}
                  style={{
                    width: "91%",
                    borderColor: OFF_WHITE,
                    marginLeft: 15
                  }}
                  date={this.state.date}
                  mode="date" format="MM-DD-YYYY" confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    placeholderText: {color: OFF_WHITE, fontSize: 15},
                    dateText: {color: OFF_WHITE, fontSize: 15},
                    dateInput: {
                      borderColor: OFF_WHITE,
                      borderWidth: 1,
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderLeftColor: 'transparent'
                    }
                  }}
                  onDateChange={(date) => {
                    this.setState({date: date})
                  }}
      />
    </View>;
  }

  renderDuration() {
    return <Input labelText={'Duration In Minutes'} stateField={'durationMinutes'}
                  onTextFieldChange={this.onTextFieldChange} keyboardType={"numeric"}/>;
  }

  renderRating() {
    return <PoopRating selected={this.state.poopRating}
                       onRatingChange={this.setPoopRating}/>;
  }
}