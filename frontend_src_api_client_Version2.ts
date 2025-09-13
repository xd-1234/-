import axios from 'axios'

const client = axios.create({
  baseURL: '/api',
  timeout: 12000
})

client.interceptors.response.use(
  r => r,
  e => {
    console.error('API Error', e)
    return Promise.reject(e)
  }
)

export default client