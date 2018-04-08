import React, {Component} from 'react'
import {StatusBar, View, KeyboardAvoidingView, TouchableOpacity} from 'react-native'
import {Button, FormLabel, Icon} from 'react-native-elements'
import {POPPINS} from '../StyleGuide/fonts'
import style from '../StyleGuide/styles'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import {BristolTypeSelection} from './BristolTypeSelection'
import {Input} from './Input'
import {Platform} from "react-native";

export default class Create extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setBristolType = this.setBristolType.bind(this)
    this.onTextFieldChange = this.onTextFieldChange.bind(this)

    this.state = {
      bristolType: 1,
      duration: null,
      comments: null,
      date: moment().format('MM-DD-YYYY'),
    }
  }

  handleSubmit() {
    Firebase.savePoop(this.state)
    this.props.navigation.goBack()
  }

  setBristolType(bristolType) {
    this.setState({bristolType})
  }

  onTextFieldChange(field, value) {
    const obj = {}
    obj[field] = value === '' ? null : value
    this.setState(obj)
  }

  render() {
    const paddingTop = Platform.OS === "ios" ? (parseInt(Platform.Version, 10) > 10 ? 35 : 20) : StatusBar.currentHeight + 10;
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
          <BristolTypeSelection
            selectedBristolType={this.state.bristolType}
            setBristolType={this.setBristolType}/>
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