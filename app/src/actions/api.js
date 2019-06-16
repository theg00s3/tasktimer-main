import AnalyticsService from '../modules/AnalyticsService'
import toISOSubstring from '../modules/to-iso-substring'

export const CREATE_POMODORO = 'CREATE_POMODORO'
export const CREATE_POMODORO_SUCCESS = 'CREATE_POMODORO_SUCCESS'
export const CREATE_POMODORO_ERROR = 'CREATE_POMODORO_ERROR'

export const CREATE_TODO = 'CREATE_TODO'
export const CREATE_TODO_SUCCESS = 'CREATE_TODO_SUCCESS'
export const CREATE_TODO_ERROR = 'CREATE_TODO_ERROR'

export const GET_POMODOROS_FOR_DATE = 'GET_POMODOROS_FOR_DATE'
export const GET_POMODOROS_FOR_DATE_SUCCESS = 'GET_POMODOROS_FOR_DATE_SUCCESS'
export const GET_POMODOROS_FOR_DATE_ERROR = 'GET_POMODOROS_FOR_DATE_ERROR'

export const GET_POMODOROS_FOR_WEEK = 'GET_POMODOROS_FOR_WEEK'
export const GET_POMODOROS_FOR_WEEK_SUCCESS = 'GET_POMODOROS_FOR_WEEK_SUCCESS'
export const GET_POMODOROS_FOR_WEEK_ERROR = 'GET_POMODOROS_FOR_WEEK_ERROR'

export function createPomodoro (pomodoro) {
  return (dispatch, getState) => {
    dispatch({type: CREATE_POMODORO, payload: null})

    const body = JSON.stringify(pomodoro)
    const url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/pomodoros'
      : 'http://localhost:3000/pomodoros'

    window.fetch(url, {
      method: 'POST',
      body,
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        getState().user && AnalyticsService.track('create-pomodoro-error', data.error)
        return dispatch({type: CREATE_POMODORO_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('create-pomodoro-success', data)
      dispatch({type: CREATE_POMODORO_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('create-pomodoro-error', err)
      return dispatch({type: CREATE_POMODORO_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}

export function createTodo (todo) {
  return (dispatch, getState) => {
    dispatch({type: CREATE_TODO, payload: null})

    const body = JSON.stringify(todo)
    const url = /todo/.test(location.href)
      ? 'https://api.pomodoro.cc/todos'
      : 'http://localhost:3000/todos'

    window.fetch(url, {
      method: 'POST',
      body,
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        getState().user && AnalyticsService.track('create-todo-error', data.error)
        return dispatch({type: CREATE_TODO_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('create-todo-success', data)
      dispatch({type: CREATE_TODO_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('create-todo-error', err)
      return dispatch({type: CREATE_TODO_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}

export function getPomodorosForDay (day = toISOSubstring()) {
  return (dispatch, getState) => {
    dispatch({type: GET_POMODOROS_FOR_DATE, payload: null})

    let url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/pomodoros'
      : 'http://localhost:3000/pomodoros'

    url += `?day=${day}`

    window.fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        getState().user && AnalyticsService.track('get-pomodoros-for-day-error', data.error)
        return dispatch({type: GET_POMODOROS_FOR_DATE_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('get-pomodoros-for-day-success', data)
      dispatch({type: GET_POMODOROS_FOR_DATE_SUCCESS, payload: {date: day, pomodoros: data}})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('get-pomodoros-for-day-error', err)
      return dispatch({type: GET_POMODOROS_FOR_DATE_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}

export function getPomodorosForWeek (week) {
  return (dispatch, getState) => {
    dispatch({type: GET_POMODOROS_FOR_WEEK, payload: null})

    const url = /pomodoro/.test(location.href)
      ? `https://api.pomodoro.cc/pomodoros/weekly/${week}`
      : `http://localhost:3000/pomodoros/weekly/${week}`

    window.fetch(url, {
      method: 'GET',
      cache: 'no-cache',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        getState().user && AnalyticsService.track('get-pomodoros-for-week-error', data.error)
        return dispatch({type: GET_POMODOROS_FOR_WEEK_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('get-pomodoros-for-week-success', data)
      dispatch({type: GET_POMODOROS_FOR_WEEK_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('get-pomodoros-for-week-error', err)
      return dispatch({type: GET_POMODOROS_FOR_WEEK_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}
