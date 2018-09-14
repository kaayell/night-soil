import { shallow } from 'enzyme/build/index'
import React from 'react'
import Summary from './Summary'
import { Text } from 'react-native-elements'

describe('Summary', () => {
  let wrapper
  const poopData = [
    {
      'atWork': true,
      'comments': 'Ieieieie',
      'date': '04-15-2018',
      'durationMinutes': '3',
      'poopRating': 3,
      'salary': '23',
    },
    {
      'atWork': true,
      'date': '04-14-2018',
      'durationMinutes': '5',
      'poopRating': 5,
      'salary': '30',
    },
    {
      'atWork': true,
      'date': '04-14-2018',
      'durationMinutes': '3',
      'poopRating': 5,
      'salary': '30',
    },
    {
      'atWork': true,
      'date': '04-15-2018',
      'durationMinutes': '1',
      'poopRating': 2,
      'salary': '30',
    },
    {
      'atWork': false,
      'date': '04-15-2018',
      'durationMinutes': '1',
      'poopRating': 3,
      'salary': '30',
    },
  ]

  beforeEach(() => {
    wrapper = shallow(<Summary poopData={poopData}/>)
  })

  it('should render', () => {
    expect(wrapper).toMatchSnapshot()
  });

  it('should display how much money user made', () => {
    expect(wrapper.find(Text).at(1).props().children[1]).toEqual("5.65")
  })

  it('should display the number of poops recorded', () => {
    expect(wrapper.find(Text).at(3).props().children).toEqual(5)
  })
})