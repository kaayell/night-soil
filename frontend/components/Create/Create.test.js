import React from 'react'
import {shallow} from "enzyme";
import {DatePicker, SelectField, FlatButton, TextField} from "material-ui";
import * as apiClient from "../api/apiClient"

import {Create} from "./Create";

describe('Create', () => {
    it('should render', () => {
        let wrapper = shallow(<Create/>)

        expect(wrapper.find(SelectField).length).toEqual(1)
        expect(wrapper.find(TextField).at(0).props().floatingLabelText).toEqual("Duration (minutes)")
        expect(wrapper.find(TextField).at(1).props().floatingLabelText).toEqual("Comments")
        expect(wrapper.find(DatePicker).length).toEqual(1)
        expect(wrapper.find(FlatButton).props().label).toEqual("Add my poop!")
    })

    it('should default duration from poopTime state', () => {
        let wrapper = shallow(<Create poopTime={"12"}/>)
        expect(wrapper.find(TextField).at(0).props().defaultValue).toEqual("12")
    })

    describe('on submit', () => {

        it('takes all entered values and calls api', () => {
            apiClient.createLog = jest.fn()
            let wrapper = shallow(<Create humanId={"8928"} setActivePage={jest.fn()} clearTime={jest.fn()}/>)

            wrapper.find(SelectField).simulate('change', null, null, "3")
            wrapper.find(TextField).at(0).simulate('change', {target: {value: "12"}})
            wrapper.find(TextField).at(1).simulate('change', {target: {value: "pewp"}})
            wrapper.find(DatePicker).simulate('change', null, new Date("2017-05-20"))

            wrapper.find(FlatButton).simulate('click')

            expect(apiClient.createLog).toHaveBeenCalledWith({
                humanId: "8928",
                bristolType: "3",
                durationInMinutes: "12",
                comments: "pewp",
                dateTimeInMilliseconds: 1495238400000,
                errorTexts: {
                    bristolTypeErrorText: "",
                    commentsErrorText: "",
                    dateTimeInMillisecondsErrorText: "",
                    durationInMinutesErrorText: ""
                }
            })
        })

        it('should call action to change page', () => {
            let setActivePage = jest.fn()
            let wrapper = shallow(<Create setActivePage={setActivePage} clearTime={jest.fn()}/>)

            wrapper.find(SelectField).simulate('change', null, null, "3")
            wrapper.find(TextField).at(0).simulate('change', {target: {value: "12"}})
            wrapper.find(TextField).at(1).simulate('change', {target: {value: "pewp"}})
            wrapper.find(DatePicker).simulate('change', null, new Date("2017-05-20"))

            wrapper.find(FlatButton).simulate('click')

            expect(setActivePage).toHaveBeenCalledWith("home")

        })

        it('should call action to clear poop timer', () => {
            let clearTime = jest.fn()
            let wrapper = shallow(<Create setActivePage={jest.fn()} clearTime={clearTime}/>)

            wrapper.find(SelectField).simulate('change', null, null, "3")
            wrapper.find(TextField).at(0).simulate('change', {target: {value: "12"}})
            wrapper.find(TextField).at(1).simulate('change', {target: {value: "pewp"}})
            wrapper.find(DatePicker).simulate('change', null, new Date("2017-05-20"))
            wrapper.find(FlatButton).simulate('click')

            expect(clearTime).toHaveBeenCalled()
        })

        it('should fill error texts if fields are missing', () => {
            let wrapper = shallow(<Create humanId={""} setActivePage={jest.fn()} poopTime={null}/>)
            wrapper.find(FlatButton).simulate('click')

            expect(wrapper.find(SelectField).props().errorText).toEqual("This field is required")
            expect(wrapper.find(TextField).at(0).props().errorText).toEqual("This field is required")
            expect(wrapper.find(TextField).at(1).props().errorText).toEqual("This field is required")
            expect(wrapper.find(DatePicker).props().errorText).toEqual("This field is required")
        })

    })
})