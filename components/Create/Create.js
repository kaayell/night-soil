import React, { Component } from 'react'
import { Platform, StatusBar, TouchableOpacity, View } from 'react-native'
import { Button, FormLabel, Icon } from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import style from '../StyleGuide/styles'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import { Input } from './Input'
import PoopRating from './PoopRating'

let textStyle = {color: OFF_WHITE, fontWeight: '700', fontFamily: POPPINS_MEDIUM,};
let buttonStyle = {
  backgroundColor: 'transparent',
  width: 300,
  height: 45,
  borderColor: OFF_WHITE,
  borderWidth: .5,
  borderRadius: 5,
  margin: 10,
};

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
    Firebase.savePoop(this.state)
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
    const paddingTop = Platform.OS === "ios" ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10;

    const atWorkBackgroundColor = this.state.atWork ? OFF_WHITE : 'transparent'
    const atWorkFontColor = this.state.atWork ? BLUE : OFF_WHITE


    return (
      <View style={{flex: 1, backgroundColor: BLUE, height: "100%", paddingTop}}>
        <TouchableOpacity style={{
          flexDirection: "row",
          height: "5%",
          justifyContent: 'flex-end',
          paddingRight: 15
        }}
                          onPress={() => this.props.navigation.goBack()}>
          <Icon name={"close"} color={OFF_WHITE}/>
        </TouchableOpacity>
        <View style={{backgroundColor: BLUE, height: '90%'}}>
          <FormLabel labelStyle={{color: 'white', fontSize: 16}}
                     fontFamily={POPPINS}>Rating</FormLabel>
          <PoopRating selected={this.state.poopRating}
                      onRatingChange={this.setPoopRating}/>
          <Input labelText={'Duration'} stateField={'duration'}
                 onTextFieldChange={this.onTextFieldChange}/>
          <Input labelText={'Comments'} stateField={'comments'}
                 onTextFieldChange={this.onTextFieldChange}/>
          <FormLabel labelStyle={{color: 'white', fontSize: 16}}
                     fontFamily={POPPINS}>Date</FormLabel>
          <DatePicker showIcon={false} style={{width: 'auto'}}
                      date={this.state.date}
                      mode="date" format="MM-DD-YYYY" confirmBtnText="Confirm"
                      cancelBtnText="Cancel"
                      customStyles={{
                        placeholderText: {color: 'white', fontSize: 16},
                        dateText: {color: 'white', fontSize: 16},
                        dateInput: {borderColor: 'transparent'},
                      }}
                      onDateChange={(date) => {
                        this.setState({date: date})
                      }}
          />
          <Button title={'I\'m at work'} onPress={() => this.onWorkStatusChange()}
                  textStyle={{...textStyle, color: atWorkFontColor}}
                  buttonStyle={{...buttonStyle, backgroundColor: atWorkBackgroundColor}}
                  containerViewStyle={{flex: 1, alignItems: 'center'}}
          />
          <Button
            title='ADD'
            onPress={() => this.handleSubmit()}
            textStyle={{color: OFF_WHITE, fontWeight: '700'}}
            buttonStyle={style.button}
            containerViewStyle={{flex: 1, alignItems: 'center'}}
          />
        </View>
      </View>
    )
  }
}