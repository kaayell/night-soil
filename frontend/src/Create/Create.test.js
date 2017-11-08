import React from 'react'
import {shallow} from "enzyme";
import {DatePicker, DropDownMenu, TextField} from "material-ui";

import Create from "./Create";

describe('Create', () => {
    it('should render', () => {
        let wrapper = shallow(<Create />)

        expect(wrapper.find(DropDownMenu).length).toEqual(1)
        expect(wrapper.find(TextField).at(0).props().floatingLabelText).toEqual("Duration (minutes)")
        expect(wrapper.find(TextField).at(1).props().floatingLabelText).toEqual("Comments")
        expect(wrapper.find(DatePicker).length).toEqual(1)
    })
})