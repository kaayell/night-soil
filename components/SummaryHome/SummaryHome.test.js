import Firebase from "../Firebase/Firebase";
import React from "react";
import {shallow} from "enzyme";
import SummaryHome from "./SummaryHome";

describe('SummaryHome', () => {
  it('should render if no data', () => {
    Firebase.getPoopsRef = jest.fn(() => {
      return {
        on: jest.fn(() => Promise.resolve())
      }
    })
    let wrapper = shallow(<SummaryHome/>)
    expect(wrapper).toMatchSnapshot()
  });

  it('should render with data', () => {
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
    let wrapper = shallow(<SummaryHome/>)
    expect(wrapper).toMatchSnapshot()
  });
});