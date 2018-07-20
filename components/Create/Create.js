import React, {Component} from 'react'
import {Platform, StatusBar, TouchableOpacity, View} from 'react-native'
import {Button, Icon} from 'react-native-elements'
import {POPPINS_MEDIUM} from '../StyleGuide/fonts'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import {Input} from './Input'
import PoopRating from './PoopRating'

let textStyle = {color: OFF_WHITE, fontWeight: '700', fontSize: 20, fontFamily: POPPINS_MEDIUM,}
let buttonStyle = {
  backgroundColor: 'transparent',
  width: "100%",
  justifyContent: 'center',
  alignItems: 'center',
  height: 45,
  borderColor: OFF_WHITE,
  borderWidth: 1,
  borderRadius: 10,
}

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
    this.props.navigation.goBack()
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
    const paddingTop = Platform.OS === 'ios' ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10
    return (
      <View style={{flex: 1, backgroundColor: BLUE, paddingTop, height: "100%"}}>
        <TouchableOpacity style={{flexDirection: 'row', height: '5%', justifyContent: 'flex-end', paddingRight: 15}}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={'close'} color={OFF_WHITE}/>
        </TouchableOpacity>

        <View style={{flex: 2, flexDirection: 'column', justifyContent: 'space-evenly'}}>
          {this.renderRating()}
          {this.renderDuration()}
          {this.renderComments()}
          {this.renderDate()}
          {this.renderWorkToggle()}
        </View>
        <View style={{flex: 1, justifyContent: 'flex-end', paddingBottom: 30}}>
          <Button
            title='ADD'
            onPress={() => this.handleSubmit()}
            textStyle={{color: OFF_WHITE, fontWeight: '700', fontSize: 20}}
            buttonStyle={{
              backgroundColor: 'transparent',
              borderColor: OFF_WHITE,
              borderWidth: 1,
              borderRadius: 10,
            }}
          />
        </View>
      </View>
    )
  }

  renderWorkToggle() {
    const atWorkBackgroundColor = this.state.atWork ? OFF_WHITE : 'transparent'
    const atWorkFontColor = this.state.atWork ? BLUE : OFF_WHITE

    return <Button title={"I'm at work"}
                   onPress={() => this.onWorkStatusChange()}
                   textStyle={{...textStyle, color: atWorkFontColor, textAlign: 'center'}}
                   buttonStyle={{
                     borderColor: OFF_WHITE,
                     borderWidth: 1,
                     borderRadius: 10,
                     backgroundColor: atWorkBackgroundColor
                   }}
    />;
  }

  renderDate() {
    return <DatePicker showIcon={false}
                       style={{
                         width: "90%",
                         borderColor: OFF_WHITE,
                         marginLeft: 15
                       }}
                       date={this.state.date}
                       mode="date" format="MM-DD-YYYY" confirmBtnText="Confirm"
                       cancelBtnText="Cancel"
                       customStyles={{
                         placeholderText: {color: 'white', fontSize: 20},
                         dateText: {color: 'white', fontSize: 20},
                         dateInput: {borderColor: OFF_WHITE, borderWidth: 1, borderRadius: 10},
                       }}
                       onDateChange={(date) => {
                         this.setState({date: date})
                       }}
    />;
  }

  renderComments() {
    return <Input labelText={'Comments'} stateField={'comments'}
                  onTextFieldChange={this.onTextFieldChange} keyboardType={"default"}/>;
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