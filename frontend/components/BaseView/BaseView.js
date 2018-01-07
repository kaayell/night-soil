import React from 'react'
import { ImageBackground, View } from 'react-native'

export default (props) =>
  <ImageBackground source={require('../../assets/icons/marble-2371776_1920.jpg')}
  style={{width: "100%", height: "100%"}}>
    <View>
      {props.children}
    </View>
  </ImageBackground>