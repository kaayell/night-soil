import React, {Component} from 'react'
import {Image, View} from 'react-native'
import ActionButton from 'react-native-action-button'
import {BLUE, OFF_WHITE} from '../StyleGuide/colors'
import {POPPINS_MEDIUM} from '../StyleGuide/fonts'
import {Icon} from 'react-native-elements'
import style from '../StyleGuide/styles'
import ChartsSummary from '../ChartSummary/ChartsSummary'
import Create from "../Create/Create";
import Modal from "react-native-modal";

export class Home extends Component {
  static navigationOptions = ({navigation}) => ({
    headerTitle: (
      <View style={{paddingLeft: 10}}>
        <Image source={require('../../assets/poop.png')}
               style={{width: 35, height: 35}}/>
      </View>),
    headerStyle: {
      backgroundColor: BLUE,
    },
    headerTitleStyle: {
      color: OFF_WHITE,
      fontFamily: POPPINS_MEDIUM
    },
    headerRight:
      <Icon name={'perm-identity'} iconStyle={style.icon} color={'white'}
            onPress={() => {
              navigation.navigate('Profile')
            }}
            underlayColor={BLUE}
            size={25}/>,

  })

  state = {
    modalVisible: false
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ChartsSummary navigation={this.props.navigation}/>
        <Modal isVisible={this.state.modalVisible}
               style={{margin: 0, justifyContent: "flex-end"}}
               onBackdropPress={() => this.setState({modalVisible: false})}
        >
          <Create closeModal={() => {this.setState({modalVisible: false})}}/>
        </Modal>
        <ActionButton position="right" buttonColor="rgb(154, 192, 205)"
                      onPress={() => this.setState({modalVisible: true})}/>
      </View>)
  }
}

export default Home