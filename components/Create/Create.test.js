import {shallow} from "enzyme";
import Create from "./Create";
import React from "react";
import {FormInput} from "react-native-elements";
import DatePicker from "react-native-datepicker";
import Firebase from "../Firebase/Firebase";

describe('Create', () => {
  let wrapper, fakeCloseModal

  beforeEach(() => {
    Firebase.getUserDetailsRef = () => {
      return {
        once: () => Promise.resolve({val: () => {
          return {salary: "20"}
        }})
      }
    }
    fakeCloseModal = jest.fn()

    wrapper = shallow(<Create closeModal={fakeCloseModal}/>)
  })

  it('should render a whole lot', () => {
    expect(wrapper).toMatchSnapshot()
  });

  describe('duration', () => {
    it('should set state on change', () => {
      wrapper.find(FormInput).at(0).props().onChangeText("3")
      expect(wrapper.instance().state.durationMinutes).toEqual("3")
    });
  });

  describe('date', () => {
    it('should set state on change', () => {
      wrapper.find(DatePicker).props().onDateChange("03-20-2018")
      expect(wrapper.instance().state.date).toEqual("03-20-2018")
    });
  });

  describe('work toggle', () => {
    it('should toggle state', () => {
      wrapper.find('Button').at(0).props().onPress()
      expect(wrapper.instance().state.atWork).toEqual(true)
    });
  });

  describe('poop rating', () => {
    it('should pass through function', () => {
      expect(wrapper.find('PoopRating').props().onRatingChange).toEqual(wrapper.instance().setPoopRating)
    });
  });

  describe('onSubmit', () => {
    it('should set errors if duration is not added', () => {
      wrapper.find('Button').at(1).props().onPress()
      expect(wrapper.instance().state.errors).toEqual(true)
    });

    it('should close the modal', () => {
      wrapper.setState({durationMinutes: "2"})
      wrapper.find('Button').at(1).props().onPress()
      expect(fakeCloseModal).toHaveBeenCalled()
    });
  });

});