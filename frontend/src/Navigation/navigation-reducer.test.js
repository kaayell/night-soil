import activePage from "./navigation-reducer"
import * as navigationActions from "./navigation-actions"

describe('navigation reducer', () => {

    it('should save active page', () => {
        expect(activePage("bleh", navigationActions.setActivePage("create"))).toBe("create")
    })
})