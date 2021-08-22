import api from '../../api'
import * as actionTypes from './actionTypes'
import * as urls from '../../constants'

export const addMessage = (message) => {
  return {
    type: actionTypes.ADD_MESSAGE,
    payload: message,
  }
}

export const setMessages = (messages) => {
  return {
    type: actionTypes.SET_MESSAGES,
    payload: messages,
  }
}

const getUserChatsSuccess = (chats) => {
  return {
    type: actionTypes.GET_CHATS_SUCCESS,
    payload: chats,
  }
}

export const getUserChats = (username) => {
  return (dispatch) => {
    api
      .get(urls.chatsAll, {
        params: {
          username: username,
        },
      })
      .then((res) => {
        dispatch(getUserChatsSuccess(res.data))
      })
  }
}
