import React from 'react'
import {shallow} from "enzyme";
import {DatePicker, DropDownMenu, FlatButton, TextField} from "material-ui";
import * as apiClient from "../api/apiClient"

import {Create} from "./Create";

describe('Create', () => {
    it('should render', () => {
        let wrapper = shallow(<Create/>)

        expect(wrapper.find(DropDownMenu).length).toEqual(1)
        expect(wrapper.find(TextField).at(0).props().floatingLabelText).toEqual("Duration (minutes)")
        expect(wrapper.find(TextField).at(1).props().floatingLabelText).toEqual("Comments")
        expect(wrapper.find(DatePicker).length).toEqual(1)
        expect(wrapper.find(FlatButton).props().label).toEqual("Submit")
    })

    describe('on submit', () => {

        it('takes all entered values and calls api', () => {
            apiClient.createLog = jest.fn()
            let wrapper = shallow(<Create humanId={"8928"} setActivePage={jest.fn()}/>)

            wrapper.find(DropDownMenu).simulate('change', null, null, "3")
            wrapper.find(TextField).at(0).simulate('change', {target: {value: "12"}})
            wrapper.find(TextField).at(1).simulate('change', {target: {value: "pewp"}})
            wrapper.find(DatePicker).simulate('change', null, new Date("2017-05-20"))

            wrapper.find(FlatButton).simulate('click')

            expect(apiClient.createLog).toHaveBeenCalledWith({
                humanId: "8928",
                bristolType: "3",
                durationInMinutes: "12",
                comments: "pewp",
                dateTimeInMilliseconds: 1495238400000
            })

            expect(wrapper.state()).toEqual({
                bristolType: null,
                durationInMinutes: null,
                comments: null,
                dateTimeInMilliseconds: null
            })
        })

        it('should call action to change page', () => {
            let setActivePage = jest.fn()
            let wrapper = shallow(<Create setActivePage={setActivePage}/>)
            wrapper.find(FlatButton).simulate('click')

            expect(setActivePage).toHaveBeenCalledWith("home")

        })

    })
})