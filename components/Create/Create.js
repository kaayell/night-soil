import React, { Component } from 'react'
import { View } from 'react-native'
import { Button, FormLabel, Icon } from 'react-native-elements'
import { POPPINS, POPPINS_MEDIUM } from '../StyleGuide/fonts'
import style from '../StyleGuide/styles'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import { BristolTypeSelection } from './BristolTypeSelection'
import { Input } from './Input'

export default class Create extends Component {
  static navigationOptions = ({navigation}) => ({
    title: 'Create',
    headerStyle: {
      backgroundColor: BLUE,
      borderBottomWidth: 0,
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM,
    },
    headerLeft: null,
    headerRight: <Icon name={'clear'} iconStyle={style.icon} color={'white'}
                       onPress={() => navigation.goBack()}
                       underlayColor={BLUE}/>,
  })

  constructor (props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.setBristolType = this.setBristolType.bind(this)
    this.onTextFieldChange = this.onTextFieldChange.bind(this)

    this.state = {
      bristolType: null,
      duration: null,
      comments: null,
      date: moment().format('MM-DD-YYYY'),
    }
  }

  handleSubmit () {
    Firebase.savePoop(this.state)
    this.props.navigation.goBack()
  }

  setBristolType (bristolType) {
    this.setState({bristolType})
  }

  onTextFieldChange (field, value) {
    const obj = {}
    obj[field] = value === '' ? null : value
    this.setState(obj)
  }

  render () {
    return (
      <View style={{backgroundColor: BLUE, height: '100%'}}>
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
                    onDateChange={(date) => {this.setState({date: date})}}
        />
        <Button
          title='ADD'
          onPress={() => this.handleSubmit()}
          textStyle={{color: OFF_WHITE, fontWeight: '700'}}
          buttonStyle={style.button}
          containerViewStyle={{flex: 1, alignItems: 'center'}}
        />
      </View>
    )
  }
}