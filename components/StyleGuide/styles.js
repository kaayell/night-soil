import { StyleSheet } from 'react-native'
import { BLUE, OFF_WHITE } from './colors'

export default style = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
  button: {
    backgroundColor: 'transparent',
    width: 300,
    height: 45,
    borderColor: OFF_WHITE,
    borderWidth: .5,
    borderRadius: 5,
  },
  textStyle: {color: OFF_WHITE, fontSize: 16},
  cardStyle: {
    marginTop: 20,
    justifyContent: 'center',
    width: "100%",
    height: 200,
    backgroundColor: 'white',
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: BLUE,
    shadowOffset: { height: 0, width: 0 },
  }
})