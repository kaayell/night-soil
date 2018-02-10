import React from 'react'
import { shallow } from 'enzyme'

import { Create } from './Create'
import Firebase from '../Firebase/Firebase'
import { Button } from 'react-native-elements'

describe('Create', () => {
  let component
  let navigation

  beforeEach(() => {
    Firebase.savePoop = jest.fn()
    navigation = {
      goBack: jest.fn()
    }
    component = shallow(<Create navigation={navigation}/>)
  })

  it('should render form', () => {
    expect(component.find('BristolTypeSelection').length()).toEqual(1)
    expect(component.find('Input').length()).toEqual(2)
    expect(component.find('DatePicker').length()).toEqual(1)
  })

  it('should pass in props to form', () => {
    let instance = component.instance();
    expect(component.find('BristolTypeSelection').props().setBristolType).toEqual(instance.setBristolType)
    expect(component.find('Input').at(0).props().labelText).toEqual('Duration')
    expect(component.find('Input').at(0).props().stateField).toEqual('duration')
    expect(component.find('Input').at(0).props().onTextFieldChange).toEqual(instance.onTextFieldChange)
    expect(component.find('Input').at(1).props().labelText).toEqual('Comments')
    expect(component.find('Input').at(1).props().stateField).toEqual('comments')
    expect(component.find('Input').at(1).props().onTextFieldChange).toEqual(instance.onTextFieldChange)
  })

  describe('on add button press', () => {
    beforeEach(() => {
      component.find(Button).simulate('press')
    })

    it('should call firebase with state', () => {
      expect(Firebase.savePoop).toHaveBeenCalledWith(component.getState())
    })

    it('should navigate back', () => {
      expect(navigation.goBack).toHaveBeenCalled()
    })
  })


})