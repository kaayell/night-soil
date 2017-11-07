import * as navigationActions from "./navigation-actions"
import * as navigationTypes from "./navigation-types"

describe('navigation actions', () => {

    it('should create an action', () => {
        expect(navigationActions.setActivePage("create")).toEqual({
            type: navigationTypes.SET_ACTIVE_PAGE,
            page: "create"
        })
    })
})