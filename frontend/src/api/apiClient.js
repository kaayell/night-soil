import axios from 'axios'


let apiUrl = "http://localhost:8080"
if(window.location.href.includes('cfapps')) {
    apiUrl = "https://poop-api.cfapps.io"
}

export function getHuman(email){
    return axios.get(`${apiUrl}/human?email=${email}`)
}

export function createHuman(human) {
    return axios.post(`${apiUrl}/human`, human)
}

export function updateHuman(human) {
    return axios.put(`${apiUrl}/human`, human)
}

export function createLog(logData) {
    return axios.post(`${apiUrl}/human/${logData.humanId}/log`, logData)
}