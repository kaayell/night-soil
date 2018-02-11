import React, { Component } from 'react'
import Firebase from './components/Firebase/Firebase'
import { Welcome } from './components/Welcome/Welcome'
import { Layout } from './components/Layout/Layout'

export default class App extends Component {
  state = {
    fontLoaded: false,
    userLoggedIn: undefined,
  }

  constructor (props) {
    super(props)
    Firebase.init()
  }

  async componentWillMount () {
    await Expo.Font.loadAsync({
      'poppins-regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'poppins-medium': require('./assets/fonts/Poppins-Medium.ttf'),
    })

    this.setState({fontLoaded: true})
  }

  componentDidMount () {
    Firebase.getAuth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({userLoggedIn: true})
      } else {
        this.setState({userLoggedIn: false})
      }
    }).bind(this)
  }

  render () {
    if (this.state.userLoggedIn === undefined ||
      !this.state.fontLoaded) return null

    return (
      this.state.userLoggedIn ? <Layout/> : <Welcome/>
    )
  }
}