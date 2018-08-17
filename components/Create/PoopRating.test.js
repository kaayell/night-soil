import React from "react";
import PoopRating from "./PoopRating";
import {shallow} from "enzyme";
import StarRating from "react-native-star-rating";

describe('PoopRating', () => {
  it('should render', () => {
    let wrapper = shallow(<PoopRating/>)
    expect(wrapper).toMatchSnapshot()
  });

  it('should invoke callback on selected star', () => {
    const mockSelected = jest.fn()
    let wrapper = shallow(<PoopRating onRatingChange={mockSelected}/>)
    wrapper.find(StarRating).props().selectedStar()
    expect(mockSelected).toHaveBeenCalled()
  });
});