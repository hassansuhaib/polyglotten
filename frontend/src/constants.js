import { API_SERVER } from './settings'

// The url for all the views
const apiURL = '/api'
export const endpoint = `${API_SERVER}${apiURL}`

// The api for authentication
const authURL = `/auth`

// Feed URLS
export const posts = `/feed/posts/`
export const postCreate = `/feed/posts/create/`
export const postShare = `/feed/posts/share/`
export const postEdit = (id) => `/feed/posts/${id}/update/`
export const postDelete = (id) => `/feed/posts/${id}/delete/`
export const like = (name, id) => `/feed/like/${name}/${id}/`
export const unlike = (name, id) => `/feed/unlike/${name}/${id}/`
export const commentCreate = `/feed/comments/create/`

// Authentication URLs
export const logout = `${authURL}/logout/`
export const login = `${authURL}/login/`
export const registration = `${authURL}/registration/`
export const tokenRefresh = `${authURL}/token/refresh/`

// Forum URLs
export const questions = `/forum/questions/`
export const questionCreate = `/forum/questions/create/`
export const questionDetail = (id) => `/forum/question-detail/${id}/`
export const questionDelete = (id) => `/forum/questions/${id}/delete/`
export const answerCreate = `/forum/answers/create/`
export const answerDelete = (id) => `/forum/answers/${id}/delete/`

// Misc URLS
export const tags = `/tags/`
