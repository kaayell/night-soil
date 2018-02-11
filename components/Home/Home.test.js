import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home', () => {

  it('should have action button', () => {
    let component = shallow(<Home/>)
    expect(component.find('ActionButton').length).toEqual(1)
  })

  it('should navigate to create on press of action button', () => {
    let mockNavigation = {
      navigate: jest.fn()
    }
    let component = shallow(<Home navigation={mockNavigation}/>)
    component.find('ActionButton').simulate('press')
    expect(mockNavigation.navigate).toHaveBeenCalledWith('Create')
  })

})