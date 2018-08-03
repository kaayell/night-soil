import React from 'react'
import Home from '../Home/Home'
import {StackNavigator} from 'react-navigation'
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
    Create: {screen: Create},
    ByRatingDetails: {screen: ByRatingDetails},
    SummaryDetails: {screen: SummaryDetails}
  },
  {
    mode: 'modal',
    headerMode: 'none'
  }
);