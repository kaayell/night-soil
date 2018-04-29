import React from 'react'
import { shallow } from 'enzyme'
import { FormLabel } from 'react-native-elements'
import Human from './Human'
import Firebase from '../Firebase/Firebase'

describe('Human', () => {
  let wrapper

  beforeEach(() => {
    Firebase.getAuth = jest.fn().mockReturnValue({currentUser: {hi: "hi"}})
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

    expect(wrapper.find(FormLabel).at(0).props().children).toEqual('Mary Hary')
    expect(wrapper.find(FormLabel).at(1).props().children).toEqual('hi@sup.com')
    expect(wrapper.find(FormLabel).at(2).props().children).toEqual('HOURLY RATE')
  })

  describe('on component did mount', () => {
    it('gets user information from firebase and sets it on state', () => {
      wrapper.instance().componentWillMount()
      expect(Firebase.getAuth).toHaveBeenCalled()
      expect(wrapper.state()).toEqual({user: {hi: "hi"}})
    })
  })
})