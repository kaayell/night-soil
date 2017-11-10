import humanInfo from "./human-reducer"
import * as humanActions from "./human-actions"

describe('navigation reducer', () => {

    it('should save human info', () => {
        expect(humanInfo({}, humanActions.setHumanInfo({email: "hi"}))).toEqual({email: "hi"})
    })
})