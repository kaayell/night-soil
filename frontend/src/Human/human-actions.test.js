import * as humanActions from "./human-actions"
import * as humanTypes from "./human-types"

describe('human actions', () => {

    it('should create an action', () => {
        expect(humanActions.setHumanInfo({email: "Hi!"})).toEqual({
            type: humanTypes.SET_HUMAN_INFO,
            humanInfo: {email: "Hi!"}
        })
    })
})