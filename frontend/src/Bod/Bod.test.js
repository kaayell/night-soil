import React from 'react'
import {shallow} from 'enzyme'
import {TextField, RaisedButton} from 'material-ui'
import * as api from '../api/apiClient'
import Bod from './Bod'

describe('Bod', () => {
    let wrapper;

    beforeEach(() => {
        api.createHuman = jest.fn()
        wrapper = shallow(<Bod/>)
    })

    it('renders', () => {
        let textFields = wrapper.find(TextField)
        expect(textFields.length).toBe(4)
        expect(textFields.at(0).props().floatingLabelText).toBe("First Name")
        expect(textFields.at(1).props().floatingLabelText).toBe("Last Name")
        expect(textFields.at(2).props().floatingLabelText).toBe("Email")
        expect(textFields.at(3).props().floatingLabelText).toBe("Hourly Rate")
    })

    it('has default state', () => {
        expect(wrapper.state()).toEqual({
            firstName: "",
            lastName: "",
            email: "",
            hourlyRate: ""
        })
    })

    it('changes state on text changes', () => {
        let textFields = wrapper.find(TextField)
        textFields.at(0).simulate('change', {target: {value: "hihi"}})
        expect(wrapper.state().firstName).toEqual("hihi")

        textFields.at(1).simulate('change', {target: {value: "yoyo"}})
        expect(wrapper.state().lastName).toEqual("yoyo")

        textFields.at(2).simulate('change', {target: {value: "wut"}})
        expect(wrapper.state().email).toEqual("wut")

        textFields.at(3).simulate('change', {target: {value: "hour"}})
        expect(wrapper.state().hourlyRate).toEqual("hour")
    })

    describe('on submit', () => {

        it('sends data to api client', () => {
            wrapper.setState({firstName: "first", lastName: "last", email: "email", hourlyRate: "2.3" })
            wrapper.rerender()

            wrapper.find(RaisedButton).simulate('click')

            expect(api.createHuman).toHaveBeenCalledWith({firstName: "first", lastName: "last", email: "email", hourlyRate: "2.3"})
        })

    })
});