import React from 'react'
import Home from '../Home/Home'
import {StackNavigator} from 'react-navigation'
import Timer from '../Timer/Timer'
import Human from '../Human/Human'
import Create from '../Create/Create'

const Stack = StackNavigator({
  Home: {screen: Home},
  Profile: {screen: Human},
})

export const Layout = StackNavigator(
  {
    Main: {screen: Stack},
    Timer: {screen: Timer},
    Create: {screen: Create},
  },
  {
    mode: 'modal',
    headerMode: 'none',
  }
);