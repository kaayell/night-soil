import * as menuActions from "./menu-actions"
import * as menuTypes from "./menu-types"

describe('menu-actions', () => {

    it('should create a toggle menu action', () => {
        expect(menuActions.toggleMenu()).toEqual({
            type: menuTypes.TOGGLE_MENU
        })
    })
})