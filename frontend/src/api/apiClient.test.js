import axios from 'axios'
import * as api from './apiClient'

describe('apiClient', () => {

    it('should make a post request to create human', () => {
        const resolved = new Promise((r) => r());

        axios.post = jest.fn()
        axios.post.mockReturnValueOnce(resolved)

        api.createHuman({})
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/human', {})
    })

    //FIXME why no work?
    // it('changes url depending on window environment', () => {
    //     window.location.href = "http://poop.cfapps.io/"
    //     axios.post = jest.fn()
    //
    //     api.createHuman({})
    //     expect(axios.post).toHaveBeenCalledWith('http://poop.cfapps.io', {})
    // })

})