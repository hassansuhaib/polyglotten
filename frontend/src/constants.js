import { API_SERVER } from './settings'

// The url for all the views
const apiURL = '/api'
export const endpoint = `${API_SERVER}${apiURL}`

// The api for authentication
const authURL = `/auth`

// User URLS
export const userUpdate = `/user-update/`

// User Profile URLS
export const profile = `/profile`
export const profileUpdate = (id) => `/profile/${id}/`
export const languages = `/profile/languages`
export const interests = `/profile/interests`
export const notificationSettings = `/profile/notification-settings/`
export const notificationSettingsUpdate = (id) =>
  `/profile/notification-settings/${id}/update/`
export const languageRemove = (id) => `/profile/languages/${id}/delete/`
export const languageAdd = (id) => `/profile/languages/${id}/delete/`
export const interestRemove = (id) => `/profile/interests/${id}/delete/`
export const interestAdd = (id) => `/profile/interests/${id}/delete/`

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
export const changePassword = (id) => `${authURL}/password/change/`

// Forum URLs
export const questions = `/forum/questions/`
export const questionCreate = `/forum/questions/create/`
export const questionDetail = (id) => `/forum/question-detail/${id}/`
export const questionDelete = (id) => `/forum/questions/${id}/delete/`
export const answerCreate = `/forum/answers/create/`
export const answerDelete = (id) => `/forum/answers/${id}/delete/`
export const vote = (name, id) => `/forum/vote/${name}/${id}/`
export const unvote = (name, id) => `/forum/unvote/${name}/${id}/`

// Quiz URLS
export const quiz = `/quiz/quiz-detail/`
export const quizComplete = `/quiz/complete/`
export const quizResults = `/quiz/results/`

// Misc URLS
export const tags = `/tags/`
