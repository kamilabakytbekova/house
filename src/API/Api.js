import axios from 'axios'


const api = axios.create({
    baseURL: `https://605b21f027f0050017c063b9.mockapi.io/api/v2/`
});


export default {
    getElements: (str) => api.get(`house?${str ? 'title=' + str : null}`),
    getElementDetail: (id) => api.get(`house/${id}`),
    createElement: (data) => api.post(`house/`, data),
}