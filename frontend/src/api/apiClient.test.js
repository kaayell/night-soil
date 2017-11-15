import axios from 'axios'
import * as api from './apiClient'

describe('apiClient', () => {

    it('should make a get request to get human', () => {
        const resolved = new Promise((r) => r());

        axios.get = jest.fn()
        axios.get.mockReturnValueOnce(resolved)

        api.getHuman("booga")
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/human?email=booga")
    })

    it('should make a post request to create human', () => {
        const resolved = new Promise((r) => r());

        axios.post = jest.fn()
        axios.post.mockReturnValueOnce(resolved)

        api.createHuman({})
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/human', {})
    })

    it('should make a put request to update human', () => {
        const resolved = new Promise((r) => r());

        axios.put = jest.fn()
        axios.put.mockReturnValueOnce(resolved)

        api.updateHuman({})
        expect(axios.put).toHaveBeenCalledWith('http://localhost:8080/human', {})
    })

    it('should make a post request to create log for human', () => {
        const resolved = new Promise((r) => r());

        axios.post = jest.fn()
        axios.post.mockReturnValueOnce(resolved)
        const data = {humanId: "1", bristolType: "1"}
        api.createLog(data)
        expect(axios.post).toHaveBeenCalledWith('http://localhost:8080/human/1/log', data)
    })

})