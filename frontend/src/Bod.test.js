import React from 'react'
import {shallow, mount, render} from 'enzyme'
import {TextField} from 'material-ui'
import Bod from './Bod'

describe('Bod', () => {

    it('renders', () => {
        let wrapper = shallow(<Bod/>)
        let textFields = wrapper.find(TextField)
        expect(textFields.length).toBe(4)
        expect(textFields.at(0).props().floatingLabelText).toBe("First Name")
        expect(textFields.at(1).props().floatingLabelText).toBe("Last Name")
        expect(textFields.at(2).props().floatingLabelText).toBe("Email")
        expect(textFields.at(3).props().floatingLabelText).toBe("Hourly Rate")
    })
});