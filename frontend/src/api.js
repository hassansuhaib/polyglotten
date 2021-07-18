import axios from 'axios'
import { endpoint as baseURL } from './constants'
import * as urls from './constants'

const accessToken = localStorage.getItem('access_token')

const api = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: {
    Authorization: accessToken ? 'JWT ' + accessToken : null,
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config

    console.log('Resposne: ', error.response.status)

    // Prevent infinite loops
    if (
      error.response.status === 401 &&
      originalRequest.url === urls.refreshToken
    ) {
      window.location.href = '/login/'
      return Promise.reject(error)
    }

    if (
      error.response.status === 401 &&
      error.response.statusText === 'Unauthorized'
    ) {
      const refresh = localStorage.getItem('refresh_token')
      console.log('Refresh: ', typeof refresh)
      console.log('Refresh value: ', refresh)
      if (refresh) {
        const tokenParts = JSON.parse(atob(refresh.split('.')[1]))

        // exp date in token is expressed in seconds, while now() returns milliseconds:
        const now = Math.ceil(Date.now() / 1000)

        if (tokenParts.exp > now) {
          try {
            const response = await api.post(urls.refreshToken, {
              refresh,
            })
            setNewHeaders(response)
            originalRequest.headers['Authorization'] =
              'JWT ' + response.data.access_token
            return api(originalRequest)
          } catch (error) {
            console.log(error)
          }
        } else {
          console.log('Refresh token is expired', tokenParts.exp, now)
          window.location.href = '/login/'
        }
      } else {
        console.log('Refresh token not available.')
        window.location.href = '/login/'
      }
    }

    // specific error handling done elsewhere
    return Promise.reject(error)
  }
)

export function setNewHeaders(response) {
  console.log('In set new header: ', response)
  api.defaults.headers['Authorization'] = 'JWT ' + response.data.access
  localStorage.setItem('access_token', response.data.access)
  localStorage.setItem('refresh_token', response.data.refresh)
}

export function setHeaders(response) {
  localStorage.setItem('user', JSON.stringify(response.data.user))
  localStorage.setItem('access_token', response.data.access_token)
  localStorage.setItem('refresh_token', response.data.refresh_token)
}

export default api
