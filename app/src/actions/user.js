import 'whatwg-fetch'

import AnalyticsService from '../modules/AnalyticsService'
import { apiGetPomodorosForDay, apiGetTodolist } from './api'

export const LOAD_USER_REQUEST = 'LOAD_USER_REQUEST'
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS'
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR'

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST'
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_SUCCESS'
export const LOGOUT_USER_ERROR = 'LOGOUT_USER_ERROR'

export const TEST_POMODOROS = 'TEST_POMODOROS'

export function identifyUser (user) {
  if (user) {
    AnalyticsService.identify(user._id, user)
  }
}

export function loadUser () {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_USER_REQUEST })
    const baseUrl = /pomodoro/.test(window.location.hostname) || window.USE_PROD ? 'https://api.tasktimer.tk' : 'http://localhost:3000'
    const url = baseUrl + '/user/info'

    return window.fetch(url, {
      credentials: 'include',
      cache: 'no-cache',
      mode: 'cors',
      headers: {
        Accept: 'application/json'
      }
    })
      .then(r => r.json())
      .then(json => {
        identifyUser(json)
        dispatch({ type: LOAD_USER_SUCCESS, payload: json })
        AnalyticsService.track('load-user-success', json)
        apiGetPomodorosForDay()(dispatch, getState)
        apiGetTodolist()(dispatch, getState)
      })
      .catch((err) => {
        dispatch({ type: LOAD_USER_ERROR, payload: err })
        if (window.USE_PROD) { return }
        if (!localStorage.testUser) { return }

        dispatch({ type: TEST_POMODOROS, payload: null })
        dispatch({
          type: LOAD_USER_SUCCESS,
          payload: {
            _id: '5a9fe4e085d766000c002636',
            apikey: 'xxx',
            id: '2662706',
            avatar: 'https://avatars0.githubusercontent.com/u/2662706?v=4',
            username: 'christian-fei'
          }
        })
      })
  }
}

export function logoutUser () {
  return (dispatch, getState) => {
    dispatch({ type: LOGOUT_USER_REQUEST })
    window.fetch('https://api.tasktimer.tk/user/logout', { credentials: 'include' })
      .then(() => {
        dispatch({ type: LOGOUT_USER_SUCCESS, payload: null })
        AnalyticsService.track('logout-user-success')
      })
      .catch((err) => {
        console.error(LOGOUT_USER_ERROR, err)
        dispatch({ type: LOGOUT_USER_ERROR, payload: err })
        AnalyticsService.track('logout-user-error', err)
      })
  }
}
