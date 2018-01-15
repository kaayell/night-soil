import React, { Component } from 'react'
import { Provider } from 'react-redux'
import store from './store-index'
import Layout from './components/Layout/Layout'

export default class App extends Component {
  state = {
    fontLoaded: false
  }

  async componentWillMount () {
    await Expo.Font.loadAsync({
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    })

    this.setState({fontLoaded: true})
  }

  render () {
    return (
      this.state.fontLoaded ? <Provider store={store}><Layout/></Provider> : null
    )
  }
}