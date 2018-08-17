import React from "react";
import {shallow} from "enzyme";
import SummaryDetails from "./SummaryDetails";
import Firebase from "../Firebase/Firebase";

describe('SummaryDetails', () => {
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
    const wrapper = shallow(<SummaryDetails />)
    expect(wrapper).toMatchSnapshot()
  });
});