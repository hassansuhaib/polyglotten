import { API_SERVER } from './settings'

// The url for all the views
const apiURL = '/api'
export const endpoint = `${API_SERVER}${apiURL}`

// The api for authentication
const authURL = `/auth`

// Authentication URLs
export const logout = `${authURL}/logout/`
export const login = `${authURL}/login/`
export const registration = `${authURL}/registration/`
