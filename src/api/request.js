import axios from 'axios'
const request  = (params) => {
    const baseUrl = '/api'
    const url = baseUrl + params.url
    return axios.get(url,{params: params.data})
}
export default request