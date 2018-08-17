import React from 'react'
import { shallow } from 'enzyme'
import Timer from './Timer'

describe('Timer', function () {

  it('should render', () => {
    let wrapper = shallow(<Timer />)
    expect(wrapper).toMatchSnapshot()
  })
})