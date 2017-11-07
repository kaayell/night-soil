import menuOpen from "./menu-reducer"
import * as menuActions from "./menu-actions"

describe('menu reducer', () => {

    it('should toggle menu boolean', () => {
        expect(menuOpen(false, menuActions.toggleMenu())).toBe(true)
    })
})