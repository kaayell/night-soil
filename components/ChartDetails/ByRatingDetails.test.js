import {shallow} from "enzyme";
import ByRatingDetails from "./ByRatingDetails";
import React from "react";
import Firebase from "../Firebase/Firebase";

describe('ByRatingDetails', () => {
  it('should render', () => {
    Firebase.getPoopsRef = jest.fn(() => {
      return {
        on: jest.fn(() => Promise.resolve(
          [
            {
              val: () => {
                return "hi"
              }
            },
          ]
        ))
      }
    })
    const wrapper = shallow(<ByRatingDetails />)
    expect(wrapper).toMatchSnapshot()
  });
});