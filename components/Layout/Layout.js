import React from 'react'
import Home from '../Home/Home'
import {StackNavigator} from 'react-navigation'
import Timer from '../Timer/Timer'
import Human from '../Human/Human'
import Create from '../Create/Create'
import ByRatingDetails from "../ChartDetails/ByRatingDetails";
import SummaryDetails from "../ChartDetails/SummaryDetails";

const Stack = StackNavigator({
  Home: {screen: Home},
  Profile: {screen: Human},
})

export const Layout = StackNavigator(
  {
    Main: {screen: Stack},
    Timer: {screen: Timer},
    Create: {screen: Create},
    ByRatingDetails: {screen: ByRatingDetails},
    SummaryDetails: {screen: SummaryDetails}
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);