import React from 'react';

import {shallow} from "enzyme";
import {FloatingActionButton} from "material-ui";
import * as apiClient from "../api/apiClient"

import {Home} from "./Home";

describe('Home', () => {
    let wrapper
    let humanInfo = {
        id: 1,
        firstName: "KL",
        lastName: "Booger",
        email: "a@b.com",
        hourlyRate: 2.4
    }

    xit('should call api client on componentWillReceiveProps', () => {
        apiClient.getSummary = jest.fn()

        wrapper = shallow(<Home humanInfo={humanInfo}/>)
        wrapper.instance().componentWillReceiveProps({humanInfo: humanInfo})
        expect(apiClient.getSummary).toHaveBeenCalledWith(1)
    })

    it('renders', () => {
        wrapper = shallow(<Home humanInfo={humanInfo}/>)
        expect(wrapper.find(FloatingActionButton).length).toEqual(1)
    })

    describe('on click of add button', () => {
        it('should send off action', () => {
            let setActivePage = jest.fn()
            wrapper = shallow(<Home setActivePage={setActivePage} humanInfo={humanInfo}/>)
            wrapper.find(FloatingActionButton).simulate('click')
            expect(setActivePage).toHaveBeenCalledWith('create')
        })
    })
})