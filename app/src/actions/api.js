/*@flow*/
import PomodoroService from '../modules/PomodoroService'
import TasksService from '../modules/TasksService'
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

export function getUnfinishedPomodoro():Action {
  return (dispatch, getState) => {
    dispatch({type:GET_UNFINISHED_POMODORO_REQUEST, payload:{}})
    PomodoroService.unfinished()
    .then((response) => {
      const pomodoro = response.data
      dispatch(resumeTimer(pomodoro))
    })
    .catch((error) => {
      dispatch({type:GET_UNFINISHED_POMODORO_ERROR, payload:{error}})
    })
  }
}


export function getTodaysPomodori():Action {
  return (dispatch, getState) => {
    dispatch({type:GET_TODAYS_POMODORI_REQUEST, payload:{}})
    PomodoroService.today()
    .then((response) => {
      const pomodori = response.data
      dispatch({type:GET_TODAYS_POMODORI_SUCCESS, payload:pomodori})
    })
    .catch((error) => {
      dispatch({type:GET_TODAYS_POMODORI_ERROR, payload:{error}})
    })
  }
}

export function getTodaysCompletedTasks():Action {
  return (dispatch, getState) => {
    dispatch({type:GET_TODAYS_COMPLETED_TASKS_REQUEST, payload:{}})
    TasksService.today()
    .then((response) => {
      const tasks = response.data
      dispatch({type:GET_TODAYS_COMPLETED_TASKS_SUCCESS, payload:tasks})
    })
    .catch((error) => {
      dispatch({type:GET_TODAYS_COMPLETED_TASKS_ERROR, payload:{error}})
    })
  }
}
