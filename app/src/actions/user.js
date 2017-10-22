import 'whatwg-fetch'

import AnalyticsService from '../modules/AnalyticsService'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR'

export function identifyUser (user) {
  console.log('identifyUser', user)
  AnalyticsService.identify(user._id, user)
}

export function loadUser () {
  return (dispatch, getState) => {
    dispatch({type: LOAD_USER_REQUEST})
    window.fetch('https://auth.pomodoro.cc/info', {credentials: 'include'})
      .then(r => r.json())
      .then(json => {
        identifyUser(json)
        dispatch({type: LOAD_USER_SUCCESS, payload: json})
      })
      .catch((err) => dispatch({type: LOAD_USER_ERROR, payload: err}))
  }
}

export function logoutUser () {
  return (dispatch, getState) => {
    dispatch({type: LOGOUT_USER_REQUEST})
    window.fetch('https://auth.pomodoro.cc/logout', {credentials: 'include'})
      .then(() => dispatch({LOGOUT_USER_SUCCESS}))
      .catch((err) => {
        console.error('LOGOUT_USER_ERROR', err)
        dispatch({type: LOGOUT_USER_ERROR, payload: err})
      })
  }
}
