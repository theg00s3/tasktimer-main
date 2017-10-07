/*     */
import PomodoroService from '../modules/PomodoroService'
import TodosService from '../modules/TodosService'
import {resumeTimer} from './'
export const GET_TODAYS_POMODORI_REQUEST = 'GET_TODAYS_POMODORI_REQUEST'
export const GET_TODAYS_POMODORI_SUCCESS = 'GET_TODAYS_POMODORI_SUCCESS'
export const GET_TODAYS_POMODORI_ERROR = 'GET_TODAYS_POMODORI_ERROR'
export const GET_UNFINISHED_POMODORO_REQUEST = 'GET_UNFINISHED_POMODORO_REQUEST'
export const GET_UNFINISHED_POMODORO_SUCCESS = 'GET_UNFINISHED_POMODORO_SUCCESS'
export const GET_UNFINISHED_POMODORO_ERROR = 'GET_UNFINISHED_POMODORO_ERROR'
export const GET_TODAYS_COMPLETED_TASKS_REQUEST = 'GET_TODAYS_COMPLETED_TASKS_REQUEST'
export const GET_TODAYS_COMPLETED_TASKS_SUCCESS = 'GET_TODAYS_COMPLETED_TASKS_SUCCESS'
export const GET_TODAYS_COMPLETED_TASKS_ERROR = 'GET_TODAYS_COMPLETED_TASKS_ERROR'

export function getUnfinishedPomodoro () {
  return (dispatch, getState) => {
    dispatch({type: GET_UNFINISHED_POMODORO_REQUEST, payload: {}})
    PomodoroService.unfinished()
    .then((response) => {
      const pomodoro = response.data
      dispatch(resumeTimer(pomodoro))
    })
    .catch((error) => {
      dispatch({type: GET_UNFINISHED_POMODORO_ERROR, payload: {error}})
    })
  }
}

export function getTodaysPomodori () {
  return (dispatch, getState) => {
    dispatch({type: GET_TODAYS_POMODORI_REQUEST, payload: {}})
    PomodoroService.today()
    .then((response) => {
      const pomodori = response.data
      dispatch({type: GET_TODAYS_POMODORI_SUCCESS, payload: pomodori})
    })
    .catch((error) => {
      dispatch({type: GET_TODAYS_POMODORI_ERROR, payload: {error}})
    })
  }
}

export function getTodaysCompletedTodos () {
  return (dispatch, getState) => {
    dispatch({type: GET_TODAYS_COMPLETED_TASKS_REQUEST, payload: {}})
    TodosService.today()
    .then((response) => {
      const todos = response.data
      dispatch({type: GET_TODAYS_COMPLETED_TASKS_SUCCESS, payload: todos})
    })
    .catch((error) => {
      dispatch({type: GET_TODAYS_COMPLETED_TASKS_ERROR, payload: {error}})
    })
  }
}
