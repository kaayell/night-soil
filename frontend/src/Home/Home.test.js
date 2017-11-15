import React from 'react';

import {shallow} from "enzyme";
import {Home} from "./Home";
import {FloatingActionButton} from "material-ui";

describe('Home', () => {
    let wrapper
    it('renders', () => {
        wrapper = shallow(<Home/>)
        expect(wrapper.find(FloatingActionButton).length).toEqual(1)
    })

    describe('on click of add button', () => {
        it('should send off action', () => {
            let setActivePage = jest.fn()
            wrapper = shallow(<Home setActivePage={setActivePage}/>)
            wrapper.find(FloatingActionButton).simulate('click')
            expect(setActivePage).toHaveBeenCalledWith('create')
        })
    })
})