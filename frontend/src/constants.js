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
export const tokenRefresh = `${authURL}/token/refresh`

// Forum URLs
export const questions = `/forum/questions/`
export const createQuestion = `/forum/questions/create/`
export const questionDetail = (id) => `/forum/question-detail/${id}`
export const questionDeleteURL = (id) => `/forum/questions/${id}/delete/`
export const createAnswer = `/forum/answers/create/`
export const answerDeleteURL = (id) => `/forum/answers/${id}/delete/`

// Misc URLS
export const tags = `/tags/`
