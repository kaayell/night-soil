import React from 'react'
import {shallow} from 'enzyme'
import {FormInput, FormLabel} from 'react-native-elements'
import Human from './Human'
import Firebase from '../Firebase/Firebase'

describe('Human', () => {
  let wrapper

  beforeEach(() => {
    Firebase.getAuth = jest.fn().mockReturnValue({user: {hi: "hi"}})
    Firebase.getUserDetailsRef = () => {
      return {
        once: (val) => {
          return {
            then: () => {

            }
          }
        }
      }
    }

    wrapper = shallow(<Human/>)
  })

  it('renders with user data', () => {
    wrapper.setState({user: {displayName: 'Mary Hary', email: 'hi@sup.com'}})

    expect(wrapper.find('FormLabel').at(0).text()).toEqual('Name')
    expect(wrapper.find('FormInput').at(0).text()).toEqual('Mary Hary')

    expect(wrapper.find('FormLabel').at(0).text()).toEqual('Email')
    expect(wrapper.find('FormInput').at(0).text()).toEqual('hi@sup.com')

    expect(wrapper.find('FormLabel').at(0).text()).toEqual('Hourly Rate')
  })

  describe('on component did mount', () => {
    it('gets user information from firebase and sets it on state', () => {
      wrapper.instance().componentDidMount()
      expect(Firebase.getAuth).toHaveBeenCalled()
      expect(wrapper.getState()).toEqual({user: {hi: "hi"}})
    })
  })
})