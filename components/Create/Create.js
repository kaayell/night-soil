import React, {Component} from 'react'
import {SafeAreaView, View} from 'react-native'
import {Button, CheckBox, Divider, FormInput, FormLabel} from 'react-native-elements'
import {POPPINS} from '../StyleGuide/fonts'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import DatePicker from 'react-native-datepicker'
import Firebase from '../Firebase/Firebase'
import moment from 'moment'
import PoopRating from './PoopRating'
import Timer from "../Timer/Timer";

export default class Create extends Component {

  constructor(props) {
    super(props)

    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTimerDone = this.handleTimerDone.bind(this)
    this.setPoopRating = this.setPoopRating.bind(this)

    this.state = {
      poopRating: 3,
      durationMinutes: 0,
      comments: null,
      date: moment().format('MM-DD-YYYY'),
      atWork: false,
      errors: false
    }
  }


  componentWillMount() {
    this.setState({durationMinutes: this.props.durationMinutes})
  }

  handleSubmit() {
    if (!this.state.durationMinutes) {
      this.setState({
        errors: true
      })
      return
    }

    Firebase.getUserDetailsRef().once('value').then((snapshot) => {
      let salary = snapshot.val() && snapshot.val().salary
      Firebase.savePoop({
        ...this.state,
        salary
      })
    })
    this.props.closeModal()
  }

  handleTimerDone(durationMinutes) {
    this.setState({durationMinutes})
  }

  setPoopRating(poopRating) {
    this.setState({poopRating})
  }

  renderRating() {
    return <PoopRating selected={this.state.poopRating}
                       onRatingChange={this.setPoopRating}/>;
  }

  renderDate() {
    return <View>
      <FormLabel fontFamily={POPPINS}
                 labelStyle={{
                   color: OFF_WHITE,
                   fontSize: 12
                 }}>Date</FormLabel>
      <DatePicker showIcon={false}
                  style={{
                    borderColor: OFF_WHITE,
                  }}
                  date={this.state.date}
                  mode="date" format="MM-DD-YYYY" confirmBtnText="Confirm"
                  cancelBtnText="Cancel"
                  customStyles={{
                    placeholderText: {color: OFF_WHITE, fontSize: 15},
                    dateText: {color: OFF_WHITE, fontSize: 15},
                    dateInput: {
                      borderWidth: 1,
                      borderTopColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderLeftColor: 'transparent',
                      borderBottomColor: OFF_WHITE
                    }
                  }}
                  onDateChange={(date) => {
                    this.setState({date: date})
                  }}
      />
    </View>;
  }

  renderWorkToggle() {
    return <CheckBox
      center
      title='At Work?'
      checked={this.state.atWork}
      onPress={() => this.setState({atWork: !this.state.atWork})}
      containerStyle={{backgroundColor: 'transparent', borderColor: 'transparent'}}
      textStyle={{fontFamily: POPPINS, color: OFF_WHITE}}
      checkedColor={OFF_WHITE}
    />
  }

  renderDuration() {
    const color = this.state.errors ? 'red' : OFF_WHITE;
    return (<View>
        <FormLabel fontFamily={POPPINS}
                   labelStyle={{
                     color: OFF_WHITE,
                     fontSize: 12
                   }}>
          Time Poopin'
        </FormLabel>
        <FormInput
          value={Math.round(this.state.durationMinutes).toString()}
          onChangeText={(text) =>
            this.setState({durationMinutes: text})
          }
          containerStyle={{
            borderBottomColor: color,
            width: 80
          }}
          inputStyle={{
            color: OFF_WHITE,
            paddingLeft: 10
          }}
          returnKeyType={"done"}
          keyboardType={'numeric'}
          placeholderTextColor={OFF_WHITE}
          underlineColorAndroid={color}
        />
      </View>
    );
  }

  renderAddButton() {
    return <Button
      title='ADD'
      onPress={() => this.handleSubmit()}
      textStyle={{color: OFF_WHITE, fontWeight: '700', fontSize: 15}}
      buttonStyle={{
        backgroundColor: 'transparent',
        borderColor: OFF_WHITE,
        borderWidth: 1,
        borderRadius: 10,
      }}
    />;
  }

  render() {
    return (
      <SafeAreaView style={{backgroundColor: BLUE, height: 400, justifyContent: 'center'}}>
        <View style={{height: 350}}>
          <View style={{flex: 1, marginTop: 5, marginLeft: 5}}>
            <Timer onTimerDone={this.handleTimerDone}/>
          </View>

          <Divider/>
          <View style={{flex: 1, paddingBottom: 20}}>
            {this.renderRating()}
          </View>
          <View style={{
            flex: 1,
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-evenly',
            marginBottom: 10
          }}>
            {this.renderDuration()}
            {this.renderDate()}
          </View>
          <View style={{flex: 1}}>
            {this.renderWorkToggle()}
          </View>
          <View style={{flex: 1, paddingBottom: 0}}>
            {this.renderAddButton()}
          </View>
        </View>
      </SafeAreaView>
    )
  }
}