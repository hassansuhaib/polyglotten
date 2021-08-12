import api, { setNewHeaders } from './api'
import { tokenRefresh } from './constants'

export const refreshToken = (refresh) => {
  api
    .post(tokenRefresh, {
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
