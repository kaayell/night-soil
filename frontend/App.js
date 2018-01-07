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
      'roboto': require('./assets/fonts/Roboto-Regular.ttf'),
      'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf'),
    })

    this.setState({fontLoaded: true})
  }

  render () {
    return (
      this.state.fontLoaded ? <Provider store={store}>
        <Layout/>
      </Provider> : null
    )
  }
}