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

export const showError = (error) => {
  try {
    if (error) {
      for (const key in error.response.data) {
        return error.response.data[key]
      }
    }
  } catch {
    return 'An Error Occurred'
  }
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}
