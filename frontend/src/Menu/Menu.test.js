import React from 'react'
import {shallow} from 'enzyme'
import {Drawer, MenuItem} from "material-ui"
import {Menu} from './Menu'

describe('Menu', () => {
    it('renders when menuOpen prop is true', () => {
        let wrapper = shallow(<Menu menuOpen={true} />)
        expect(wrapper.find(Drawer).props().open).toBe(true)
    })

    it('should handle closing the menu on MenuItem click', () => {
        let toggleMenuMock = jest.fn()
        let wrapper = shallow(<Menu menuOpen={true} toggleMenu={toggleMenuMock}/>)
        wrapper.find(MenuItem).at(0).simulate('click')
        expect(toggleMenuMock).toHaveBeenCalled()
    })
})