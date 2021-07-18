import axiosAPI, { setNewHeaders } from '../../api/axiosApi'
import * as actionTypes from './actionTypes'
import * as urls from '../../constants'
import history from '../../history'

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

export const logout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')

  return {
    type: actionTypes.AUTH_LOGOUT,
  }
}

export const login = (username, password, from) => (dispatch) => {
  dispatch(authStart())
  axiosAPI
    .post(urls.login, {
      username,
      password,
    })
    .then((response) => {
      console.log('Meow: ', response)
      setNewHeaders(response)
      dispatch(authSuccess(response.data.access_token))
      history.push(from)
    })
    .catch((error) => {
      console.log('Error: ', error)
      dispatch(authFail(error))
    })
}

export const signUp =
  (username, firstName, lastName, email, password1, password2, gender) =>
  (dispatch) => {
    dispatch(authStart())
    axiosAPI
      .post(urls.registration, {
        username,
        firstName,
        lastName,
        email,
        password1,
        password2,
        gender,
      })
      .then((response) => {
        setNewHeaders(response)
        dispatch(authSuccess(response.data.access_token))
      })
      .catch((error) => {
        console.log('Error: ', error)
        dispatch(authFail(error))
      })
  }

export const authCheckState = () => {
  return (dispatch) => {
    const access_token = localStorage.getItem('access_token')
    const refresh_token = localStorage.getItem('refresh_token')
    if (access_token === undefined || refresh_token === undefined) {
      dispatch(logout())
    } else {
      dispatch(authSuccess(access_token))
    }
  }
}

// export const authLogin = (username, password) => {
//   return (dispatch) => {
//     dispatch(authStart())
//     api
//       .post(urls.login, {
//         username: username,
//         password: password,
//       })
//       .then((res) => {
//         console.log('Response: ', res)
//         const token = res.data.key
//         const expirationDate = new Date(new Date().getTime() + SESSION_DURATION)
//         localStorage.setItem('token', token)
//         localStorage.setItem('expirationDate', expirationDate)
//         dispatch(authSuccess(token))
//         dispatch(authCheckTimeout(SESSION_DURATION))
//       })
//       .catch((err) => {
//         console.log('Error: ', err)
//         dispatch(authFail(err))
//       })
//   }
// }

// export const authRegister =
//   (username, firstName, lastName, email, password1, password2, gender) =>
//   (dispatch) => {
//     dispatch(authStart())
//     api
//       .post(urls.registration, {
//         first_name: firstName,
//         last_name: lastName,
//         email: email,
//         username: username,
//         password1: password1,
//         password2: password2,
//         gender: gender,
//       })
//       .then((res) => {
//         const token = res.data.key
//         const expirationDate = new Date(new Date().getTime() + SESSION_DURATION)
//         localStorage.setItem('token', token)
//         localStorage.setItem('expirationDate', expirationDate)
//         dispatch(authSuccess(token))
//         dispatch(authCheckTimeout(SESSION_DURATION))
//       })
//       .catch((err) => {
//         dispatch(authFail(err))
//       })
//   }
