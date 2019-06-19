import 'whatwg-fetch'

import AnalyticsService from '../modules/AnalyticsService'
import { recreatePomodoros, recreateTodos } from '.'
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
    dispatch({type: LOAD_USER_REQUEST})
    const baseUrl = /pomodoro/.test(window.location.hostname) || window.USE_PROD ? 'https://api.pomodoro.cc' : 'http://localhost:3000'
    const url = baseUrl + '/user/info'

    window.fetch(url, {credentials: 'include'})
      .then(r => r.json())
      .then(json => {
        identifyUser(json)
        dispatch({type: LOAD_USER_SUCCESS, payload: json})
        AnalyticsService.track('load-user-success', json)
        apiGetPomodorosForDay()(dispatch, getState)
        apiGetTodolist()(dispatch, getState)

        // window.localStorage.setItem('recreatedOldPomodoros20190618', false)
        if (window.localStorage.recreatedOldPomodoros20190618 !== 'true') {
          const {pomodoros} = getState()
          console.log('recreate pomodoros.length', pomodoros && pomodoros.length)
          dispatch(recreatePomodoros(pomodoros))
          AnalyticsService.track('recreated-old-pomodoros')
          window.localStorage.setItem('recreatedOldPomodoros20190618', true)
        }
        // window.localStorage.setItem('recreatedOldTodos20190618', false)
        if (window.localStorage.recreatedOldTodos20190618 !== 'true') {
          const {todos} = getState()
          console.log('recreate todos.length', todos && todos.length)
          dispatch(recreateTodos(todos))
          AnalyticsService.track('recreated-old-todos')
          window.localStorage.setItem('recreatedOldTodos20190618', true)
        }
      })
      .catch((err) => {
        dispatch({type: LOAD_USER_ERROR, payload: err})
        if (window.USE_PROD) { return }
        if (!localStorage.testUser) { return }

        dispatch({ type: TEST_POMODOROS, payload: null })
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
    window.fetch('https://api.pomodoro.cc/user/logout', {credentials: 'include'})
      .then(() => {
        dispatch({type: LOGOUT_USER_SUCCESS, payload: null})
        AnalyticsService.track('logout-user-success')
      })
      .catch((err) => {
        console.error(LOGOUT_USER_ERROR, err)
        dispatch({type: LOGOUT_USER_ERROR, payload: err})
        AnalyticsService.track('logout-user-error', err)
      })
  }
}
