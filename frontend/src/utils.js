import axiosAPI, { setNewHeaders } from './api/axiosApi'
import { refreshToken } from './constants'

export const refreshToken = (refresh) => {
  axiosAPI
    .post(refreshToken, {
      refresh,
    })
    .then((response) => {
      setNewHeaders(response)
    })
    .catch((error) => error)
}

export const isAuthenticated = () => {
  const token = localStorage.getItem('access_token')
  return !!token
}
