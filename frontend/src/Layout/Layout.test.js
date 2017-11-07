import React from 'react';
import {shallow} from 'enzyme'
import Home from "../Home/Home";
import Timer from "../Timer/Timer";

import {Layout} from "./Layout";

describe('Layout', () => {
    it('should render home by default', () => {
        let wrapper = shallow(<Layout/>)
        expect(wrapper.find(Home).length).toEqual(1)
    })

    it('should render timer page based off state', () => {
        let wrapper = shallow(<Layout activePage={"timer"}/>)
        expect(wrapper.find(Timer).length).toEqual(1)
    })
})

