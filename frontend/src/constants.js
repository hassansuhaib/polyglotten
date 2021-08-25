import { API_SERVER } from './settings'

// The url for all the views
const apiURL = '/api'
export const endpoint = `${API_SERVER}${apiURL}`

// The api for authentication
const authURL = `/auth`

// User URLS
export const userUpdate = `/user-update/`
export const userSearch = `/users/search/`

// User Profile URLS
export const profile = (username) => `/profile/${username}/detail/`
export const profileUpdate = (id) => `/profile/${id}/update/`
export const follow = `/profile/follow/`
export const unfollow = `/profile/unfollow/`
export const checkFollow = `/profile/check-follow/`
export const followers = `/profile/followers/`
export const following = `/profile/following/`
export const notificationSettings = `/profile/notification-settings/`
export const notificationSettingsUpdate = (id) =>
  `/profile/notification-settings/${id}/update/`
export const languages = `/profile/languages`
export const interests = `/profile/interests`
export const languageUpdate = (action) => `/profile/languages/update/${action}/`
export const interestUpdate = (action) => `/profile/interests/update/${action}/`

// Feed URLS
export const posts = `/feed/posts/`
export const recommendedPosts = `/recommendation/posts/`
export const recommendedUsers = `/recommendation/users/`
export const userPosts = (username) => `/feed/posts/user/${username}/`
export const postCreate = `/feed/posts/create/`
export const postShare = `/feed/posts/share/`
export const postDetail = (id) => `/feed/post/${id}/detail/`
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

// Chat URLS
export const chatsAll = `/chats/`
export const chatCreate = `/chats/create/`
export const chatDetail = (id) => `/chats/${id}/`
export const chatUpdate = (id) => `/chats/${id}/update/`
export const chatDelete = (id) => `/chats/${id}/delete/`

// Voice Channels
export const channels = `/channels/all/`
export const channelsCreate = `/channels/create/`
export const channelsDetail = (id) => `/channels/detail/${id}/`
export const channelsUpdate = (id) => `/channels/${id}/update/`

// Notification URLS
export const notifications = `/notifications/`

// Misc URLS
export const tags = `/tags/`
export const languagesAll = `/languages/`
export const interestsAll = `/interests/`
export const search = `/search/`
