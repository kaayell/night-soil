import React from 'react'
import {shallow} from 'enzyme'
import {TextField, RaisedButton} from 'material-ui'
import * as api from '../api/apiClient'
import {Human} from './Human'

describe('Human', () => {
    let wrapper;
    let setHumanInfo
    let humanInfo

    beforeEach(() => {
        api.updateHuman = jest.fn()
        setHumanInfo = jest.fn()
        humanInfo = {
            id: 22,
            email: "hi@sup.com",
            firstName: "Mary",
            lastName: "Hary",
            hourlyRate: ""
        }
        wrapper = shallow(<Human humanInfo={humanInfo} setHumanInfo={setHumanInfo}/>)
    })

    it('renders with human info', () => {
        let textFields = wrapper.find(TextField)
        expect(textFields.length).toBe(3)
        expect(textFields.at(0).props().floatingLabelText).toBe("Name")
        expect(textFields.at(0).props().defaultValue).toBe("Mary Hary")
        expect(textFields.at(1).props().floatingLabelText).toBe("Email")
        expect(textFields.at(1).props().defaultValue).toBe("hi@sup.com")
        expect(textFields.at(1).props().disabled).toBe(true)
        expect(textFields.at(2).props().floatingLabelText).toBe("Hourly Rate")
        expect(textFields.at(2).props().defaultValue).toBe("")
    })

    it('changes state on text changes', () => {
        let textFields = wrapper.find(TextField)
        textFields.at(2).simulate('change', {target: {value: "hour"}})
        expect(wrapper.state().hourlyRate).toEqual("hour")
    })

    describe('on submit', () => {
        it('sends data to api client', () => {
            wrapper.find(TextField).at(2).simulate('change', {target: {value: "2"}})
            wrapper.find(RaisedButton).simulate('click')

            expect(api.updateHuman).toHaveBeenCalledWith({
                id: 22,
                firstName: "Mary",
                lastName: "Hary",
                email: "hi@sup.com",
                hourlyRate: "2"
            })
        })

        it('should tell the rest of the system there was an update to human info', () => {
            wrapper.find(RaisedButton).simulate('click')
            expect(setHumanInfo).toHaveBeenCalledWith(humanInfo)
        })
    })
});