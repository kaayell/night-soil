import React from 'react';
import {shallow} from 'enzyme'

import Header from "./Header";

import Layout from "./Layout";
import Bod from "./Bod";

describe('Layout', () => {
    it('renders', () => {
        let wrapper = shallow(<Layout/>)
        expect(wrapper.find(Header)).toBeTruthy()
        expect(wrapper.find(Bod)).toBeTruthy()
    });
})

