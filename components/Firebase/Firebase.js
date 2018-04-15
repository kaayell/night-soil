import * as firebase from 'firebase'
import { ANDROID_API_KEY, config, IOS_API_KEY } from './secrets'

export default class Firebase {
  static init () {
    firebase.initializeApp(config)
  }

  static getAuth() {
    return firebase.auth()
  }

  static getUserDetailsRef() {
    let uid = firebase.auth().currentUser.uid
    return firebase.database().ref(`/user/details/${uid}`)
  }

  static savePoop(poopDetails) {
    let currentUser = firebase.auth().currentUser
    firebase.database().ref(`/poop/${currentUser.uid}`).push().set(poopDetails)
  }

  static getPoopsRef(){
    let uid = firebase.auth().currentUser.uid
    return firebase.database().ref(`/poop/${uid}`)
  }

  static async loginWithGoogle () {
    const response = await Expo.Google.logInAsync({
      androidClientId: ANDROID_API_KEY,
      iosClientId: IOS_API_KEY,
      scopes: ['profile', 'email'],
    })

    if (response.type === 'success') {
      const credential = firebase.auth.GoogleAuthProvider.credential(response.idToken, response.accessToken)
      firebase.auth().signInWithCredential(credential)
    }
  }
}