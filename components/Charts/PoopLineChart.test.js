import BristolLineChart from "./PoopLineChart";
import React from "react";
import {shallow} from "enzyme";

describe('PoopLineChart', () => {
  let component;
  const poopData = [
    {date: "04-08-2018"},
    {date: "04-08-2018"},
    {date: "04-08-2018"},
    {date: "04-10-2018"}
  ]

  beforeEach(() => {
    component = shallow(<BristolLineChart poopData={poopData}/>);
  })

  it('should find highest frequency and count up to that', () => {
    expect(component.find('YAxis').props().data).toEqual([0, 1, 2, 3])
  });

  it('should fill in days that are missing for x axis', () => {
    expect(component.find('XAxis').props().data).toEqual(['04-08-2018', '04-09-2018', '04-10-2018'])
  });

  it('should fill in from today and the past 15 days', () => {
    expect(component.find('XAxis').props().data.length).toEqual(15)
  });

});