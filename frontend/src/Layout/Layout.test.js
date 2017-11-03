import React from 'react';
import {shallow} from 'enzyme'

import Header from "../Header/Header";
import Bod from "../Bod/Bod";

import Layout from "./Layout";

describe('Layout', () => {
    it('renders', () => {
        let wrapper = shallow(<Layout/>)
        expect(wrapper.find(Header)).toBeTruthy()
        expect(wrapper.find(Bod)).toBeTruthy()
    });
})

