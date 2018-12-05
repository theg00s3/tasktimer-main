import 'whatwg-fetch'

import AnalyticsService from '../modules/AnalyticsService'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR'

export const TEST_POMODOROS = 'TEST_POMODOROS'
export const TEST_DISTRACTIONS = 'TEST_DISTRACTIONS'

export function identifyUser (user) {
  console.log('identifyUser', user)
  if (user) {
    AnalyticsService.identify(user._id, user)
  }
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
      .catch((err) => {
        if (window.location.hostname !== 'localhost') {
          dispatch({type: LOAD_USER_ERROR, payload: err})
          return
        }

        dispatch({ type: TEST_POMODOROS, payload: null })
        dispatch({ type: TEST_DISTRACTIONS, payload: null })
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: {
            '_id': '5a9fe4e085d766000c002636',
            'apikey': 'xxx',
            'id': '2662706',
            'avatar': 'https://avatars0.githubusercontent.com/u/2662706?v=4',
            'username': 'christian-fei'
          }
        })
      })
  }
}

export function logoutUser () {
  return (dispatch, getState) => {
    dispatch({type: LOGOUT_USER_REQUEST})
    window.fetch('https://auth.pomodoro.cc/logout', {credentials: 'include'})
      .then(() => dispatch({LOGOUT_USER_SUCCESS}))
      .catch((err) => {
        console.error(LOGOUT_USER_ERROR, err)
        dispatch({type: LOGOUT_USER_ERROR, payload: err})
      })
  }
}
