import React from 'react';
import {shallow} from 'enzyme'

import Layout from "./Layout";

describe('Layout', () => {
    it('renders', () => {
        let wrapper = shallow(<Layout/>)
    });
})

