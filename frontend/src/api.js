import axios from 'axios'
import { endpoint } from './constants'

export const api = axios.create({
  baseURL: endpoint,
})

export const authApi = axios.create({
  baseURL: endpoint,
})

authApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Token ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)
