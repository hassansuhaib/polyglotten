import {
  AUTH_START,
  AUTH_SUCCESS,
  AUTH_FAIL,
  AUTH_LOGOUT,
} from '../actions/actionTypes'

const INITIAL_STATE = {
  token: null,
  user: null,
  error: null,
  loading: false,
}

export const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_START:
      return { ...state, error: null, loading: true }
    case AUTH_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
        error: null,
        loading: false,
      }
    case AUTH_FAIL:
      return { ...state, error: action.payload, loading: false }
    case AUTH_LOGOUT:
      return { ...state, token: null }
    default:
      return state
  }
}
