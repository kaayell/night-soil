import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as apiClient from '../../api/apiClient'
import { setHumanInfo } from '../Human/human-actions'
import Home from '../Home/Home'
import { AuthSession } from 'expo'
import { AUTH_CONFIG } from '../Auth/secrets'
import jwt_decode from 'jwt-decode'
import { StackNavigator, TabNavigator } from 'react-navigation'
import Timer from '../Timer/Timer'
import Human from '../Human/Human'
import Create from '../Create/Create'

function toQueryString (params) {
  return '?' + Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&')
}

const BottomNavigation = TabNavigator({
    Home: {screen: Home},
    Timer: {screen: Timer},
    Profile: {screen: Human}
  }, {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    tabBarOptions: {
      activeTintColor: '#9AC0CD',
      style: {
        backgroundColor: '#fafafa'
      }

    }
  }
)

const Root = StackNavigator({
  Root: {screen: BottomNavigation},
  Create: {screen: Create}
})

export class Layout extends Component {
  constructor (props) {
    super(props)

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)

    this.state = {
      access_token: null,
      expires_at: '0'
    }

    this.loginWithAuth0 = this.loginWithAuth0.bind(this)
    this.isAuthenticated = this.isAuthenticated.bind(this)
    this.getAccessToken = this.getAccessToken.bind(this)
    this.setSession = this.setSession.bind(this)
  }

  loginWithAuth0 = async () => {
    const redirectUrl = AuthSession.getRedirectUrl()
    const result = await AuthSession.startAsync({
      authUrl: `${AUTH_CONFIG.domain}/authorize` +
      toQueryString({
        client_id: AUTH_CONFIG.clientId,
        response_type: 'id_token token',
        scope: 'openid profile email',
        redirect_uri: redirectUrl,
        nonce: 'yoyogenerateme'
      }),
    })

    if (result.type === 'success') {
      this.setSession(result.params)
      let decoded = jwt_decode(result.params.id_token)
      this.handleSuccessfulLogin(decoded)
    }
  }

  handleSuccessfulLogin (userProfile) {
    apiClient.getHuman(userProfile.email)
      .then((response) => {
        if (response.data && response.data.length > 0) {
          this.props.setHumanInfo(response.data[0])
        } else {
          const humanInfo = {
            firstName: userProfile.given_name,
            lastName: userProfile.family_name,
            email: userProfile.email,
            hourlyRate: '0'
          }
          apiClient.createHuman(humanInfo)
            .then((response) => {
              this.props.setHumanInfo(response.data)
            })
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }

  setSession (authResult) {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify((authResult.expires_in * 1000) + new Date().getTime())
    this.setState({expires_at: expiresAt, access_token: authResult.access_token})
  }

  getAccessToken () {
    const accessToken = this.state.access_token
    if (!accessToken) {
      console.error('noh access_token')
    }
    return accessToken
  }

  isAuthenticated () {
    // Check whether the current time is past the
    // access token's expiry time
    let expiresAt = JSON.parse(this.state.expires_at)
    return new Date().getTime() < expiresAt
  }

  render () {
    // if (!this.isAuthenticated()) {
    //   this.loginWithAuth0()
    //   return <View/>
    // }

    return (<Root/>)
  }
}

const mapStateToProps = state => {
  return {
    activePage: state.activePage
  }
}

export default connect(mapStateToProps, {setHumanInfo})(Layout)
