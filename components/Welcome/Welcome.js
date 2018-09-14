import React from 'react'
import { Image, Text, View } from 'react-native'
import Firebase from '../Firebase/Firebase'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'
import { POPPINS } from '../StyleGuide/fonts'
import { Button } from 'react-native-elements'

export const Welcome = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: BLUE}}>
      <Image source={require('../../assets/triangle.png')}
             style={{width: 150, height: 150}}/>
      <Text style={{color: OFF_WHITE, fontFamily: POPPINS, fontSize: 30}}>NIGHT SOIL</Text>
      <Button
        title='SIGN IN WITH GOOGLE'
        onPress={() => Firebase.loginWithGoogle()}
        textStyle={{color: OFF_WHITE, fontWeight: '700'}}
        buttonStyle={{
          marginTop: 10,
          backgroundColor: 'transparent',
          width: 300,
          height: 45,
          borderColor: OFF_WHITE,
          borderWidth: .5,
          borderRadius: 5
        }}
      />
    </View>)
}