import {shallow} from 'enzyme'
import React from 'react'
import {Welcome} from './Welcome'
import Firebase from '../Firebase/Firebase'
import {Button} from "react-native-elements";

describe('Welcome', () => {
  it('should render', () => {
    let component = shallow(<Welcome />)
    expect(component).toMatchSnapshot()
  })

  it('should call firebase on press of button', () => {
    Firebase.loginWithGoogle = jest.fn()
    let component = shallow(<Welcome />)
    component.find(Button).simulate('press')
    expect(Firebase.loginWithGoogle).toHaveBeenCalled()
  })
})