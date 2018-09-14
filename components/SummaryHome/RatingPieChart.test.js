import React from "react";
import {shallow} from "enzyme";
import RatingPieChart from "./RatingPieChart";

describe('RatingPieChart', () => {
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

  it('should render', () => {
    const wrapper = shallow(<RatingPieChart poopData={poopData}/>)
    expect(wrapper).toMatchSnapshot()
  });

});