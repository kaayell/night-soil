import React from 'react'
import { shallow } from 'enzyme'
import {FormInput, FormLabel} from 'react-native-elements'
import Human from './Human'
import Firebase from '../Firebase/Firebase'

describe('Human', () => {
  let wrapper, mockSet

  beforeEach(() => {
    Firebase.getAuth = jest.fn().mockReturnValue({currentUser: {hi: "hi"}})
    mockSet = jest.fn()
    Firebase.getUserDetailsRef = () => {
      return {
        once: (val) => {
          return {
            then: () => {

            }
          }
        },
        set: (params) => {mockSet(params)}
      }
    }

    wrapper = shallow(<Human/>)
  })

  it('should default render', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('renders with user data', () => {
    wrapper.setState({user: {displayName: 'Mary Hary', email: 'hi@sup.com'}, salary: 10.0})
    expect(wrapper.find(FormLabel).at(0).props().children).toEqual('Mary Hary')
    expect(wrapper.find(FormLabel).at(1).props().children).toEqual('hi@sup.com')
    expect(wrapper.find(FormInput).props().defaultValue).toEqual('10.00')
  })

  describe('on component did mount', () => {
    it('gets user information from firebase and sets it on state', () => {
      wrapper.instance().componentWillMount()
      expect(Firebase.getAuth).toHaveBeenCalled()
      expect(wrapper.state()).toEqual({user: {hi: "hi"}})
    })
  })

  describe('on updating salary', () => {
    it('should set new salary in firebase', () => {
      wrapper.find(FormInput).props().onChangeText("10")
      expect(mockSet).toHaveBeenCalledWith({salary: "10"})
    });
  });
})