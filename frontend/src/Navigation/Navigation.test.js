import React from 'react';
import {shallow} from 'enzyme'
import {BottomNavigationItem} from "material-ui";

import {Navigation} from "./Navigation";

describe('Navigation', () => {

    it('should render', () => {
        let wrapper = shallow(<Navigation/>)
        expect(wrapper.find(BottomNavigationItem).length).toEqual(2)
    })

    it('should send an action on a button click', () => {
        let setActivePage = jest.fn()
        let wrapper = shallow(<Navigation setActivePage={setActivePage} />)
        wrapper.find(BottomNavigationItem).at(1).simulate('click')
        expect(setActivePage).toHaveBeenCalledWith("timer")
    })
})