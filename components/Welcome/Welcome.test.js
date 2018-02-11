import { shallow } from 'enzyme'
import React from 'react'
import { Welcome } from './Welcome'
import Firebase from '../Firebase/Firebase'

describe('Welcome', () => {
  it('should render sign in button', () => {
    let component = shallow(<Welcome />)
    expect(component.find('Button').length).toEqual(1)
  })

  it('should call firebase on press of button', () => {
    Firebase.loginWithGoogle = jest.fn()
    let component = shallow(<Welcome />)
    component.find('Button').simulate('press')
    expect(Firebase.loginWithGoogle).toHaveBeenCalled()
  })
})