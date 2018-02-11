import React from 'react'
import Home from '../Home/Home'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Timer from '../Timer/Timer'
import Human from '../Human/Human'
import Create from '../Create/Create'
import { BLUE, OFF_WHITE } from '../StyleGuide/colors'

const BottomNavigation = TabNavigator({
    Home: {screen: Home},
    Timer: {screen: Timer}
  }, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      showLabel: false,
      activeTintColor: BLUE,
      style: {
        backgroundColor: OFF_WHITE
      }

    }
  }
)

export const Layout = StackNavigator({
  Root: {screen: BottomNavigation},
  Create: {screen: Create},
  Profile: {screen: Human}
})