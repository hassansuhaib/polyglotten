import { api } from '../../api'
import * as actionTypes from './actionTypes'
import * as settings from '../../settings'
import * as urls from '../../constants'

const SESSION_DURATION = settings.SESSION_DURATION

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  }
}

export const authSuccess = (token) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    payload: token,
  }
}

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    payload: error,
  }
}

export const authLogout = () => {
  const token = localStorage.getItem('token')
  if (token === undefined) {
    localStorage.removeItem('expirationDate')
  } else {
    api
      .post(urls.logout)
      .then((res) => {
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      })
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
  }

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const authCheckTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(authLogout())
    }, expirationTime)
  }
}

export const authLogin = (username, password) => {
  return (dispatch) => {
    dispatch(authStart())
    api
      .post(urls.login, {
        username: username,
        password: password,
      })
      .then((res) => {
        console.log('Response: ', res)
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + SESSION_DURATION)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(token))
        dispatch(authCheckTimeout(SESSION_DURATION))
      })
      .catch((err) => {
        console.log('Error: ', err)
        dispatch(authFail(err))
      })
  }
}

export const authRegister =
  (username, firstName, lastName, email, password1, password2, gender) =>
  (dispatch) => {
    console.log('Email: ', email)
    dispatch(authStart())
    api
      .post(urls.registration, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        username: username,
        password1: password1,
        password2: password2,
        gender: gender,
      })
      .then((res) => {
        const token = res.data.key
        const expirationDate = new Date(new Date().getTime() + SESSION_DURATION)
        localStorage.setItem('token', token)
        localStorage.setItem('expirationDate', expirationDate)
        dispatch(authSuccess(token))
        dispatch(authCheckTimeout(SESSION_DURATION))
      })
      .catch((err) => {
        dispatch(authFail(err))
      })
  }

export const authCheckState = () => {
  return (dispatch) => {
    const token = localStorage.getItem('token')
    if (token === undefined) {
      dispatch(authLogout())
    } else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'))
      if (expirationDate <= new Date()) {
        dispatch(authLogout())
      } else {
        dispatch(authSuccess(token))
        dispatch(
          authCheckTimeout(expirationDate.getTime() - new Date().getTime())
        )
      }
    }
  }
}
