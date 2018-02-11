import React from 'react'
import { shallow } from 'enzyme'
import Timer from './Timer'

describe('Timer', function () {

  it('should render buttons', () => {
    let component = shallow(<Timer />)
    expect(component.find('Button').length).toBe(3)
  })
})