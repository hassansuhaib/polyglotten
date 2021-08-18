import * as actionTypes from '../actions/actionTypes'

const initialState = {
  messages: [],
  chats: [],
}

export const messageReducer = (state = initialState, action) => {
  console.log('Action payload: ', action.payload)
  switch (action.type) {
    case actionTypes.ADD_MESSAGE:
      return { ...state, messages: action.payload.reverse() }
    case actionTypes.SET_MESSAGES:
      return { ...state, messages: [...state.messages, action.payload] }
    case actionTypes.GET_CHATS_SUCCESS:
      return { ...state, chats: action.payload }
    default:
      return state
  }
}
