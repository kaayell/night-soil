import React from 'react'
import { shallow } from 'enzyme'
import Home from './Home'

describe('Home', () => {

  it('should have action button', () => {
    let component = shallow(<Home/>)
    expect(component.find('ActionButton').length).toEqual(1)
  })

})