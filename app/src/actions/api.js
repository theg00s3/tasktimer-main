import AnalyticsService from '../modules/AnalyticsService'

export const CREATE_POMODORO = 'CREATE_POMODORO'
export const CREATE_POMODORO_SUCCESS = 'CREATE_POMODORO_SUCCESS'
export const CREATE_POMODORO_FAILURE = 'CREATE_POMODORO_FAILURE'

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
      console.log('data', data)
      if (data.error) {
        getState().user && AnalyticsService.track('create-pomodoro-failure', data.error)
        return dispatch({type: CREATE_POMODORO_FAILURE, payload: data.error})
      }
      getState().user && AnalyticsService.track('create-pomodoro-success', data)
      dispatch({type: CREATE_POMODORO_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('create-pomodoro-failure', err)
      return dispatch({type: CREATE_POMODORO_FAILURE, payload: 'Something went wrong. Please try again'})
    })
  }
}

export function getPomodorosForDay (day) {
  return (dispatch, getState) => {
    dispatch({type: GET_POMODOROS_FOR_DATE, payload: null})

    const url = /pomodoro/.test(location.href)
      ? 'https://api.pomodoro.cc/pomodoros'
      : 'http://localhost:3000/pomodoros'

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
      console.log('data', data)
      if (data.error) {
        getState().user && AnalyticsService.track('get-pomodoros-for-day-failure', data.error)
        return dispatch({type: GET_POMODOROS_FOR_DATE_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('get-pomodoros-for-day-success', data)
      dispatch({type: GET_POMODOROS_FOR_DATE_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('get-pomodoros-for-day-failure', err)
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
      console.log('data', data)
      if (data.error) {
        getState().user && AnalyticsService.track('get-pomodoros-for-week-failure', data.error)
        return dispatch({type: GET_POMODOROS_FOR_WEEK_ERROR, payload: data.error})
      }
      getState().user && AnalyticsService.track('get-pomodoros-for-week-success', data)
      dispatch({type: GET_POMODOROS_FOR_WEEK_SUCCESS, payload: data})
    })
    .catch(err => {
      getState().user && AnalyticsService.track('get-pomodoros-for-week-failure', err)
      return dispatch({type: GET_POMODOROS_FOR_WEEK_ERROR, payload: 'Something went wrong. Please try again'})
    })
  }
}
