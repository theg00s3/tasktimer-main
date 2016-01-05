/*@flow*/
import PomodoroService from '../modules/PomodoroService'
import TasksService from '../modules/TasksService'
export const GET_TODAYS_POMODORI_REQUEST = 'GET_TODAYS_POMODORI_REQUEST'
export const GET_TODAYS_POMODORI_SUCCESS = 'GET_TODAYS_POMODORI_SUCCESS'
export const GET_TODAYS_POMODORI_ERROR = 'GET_TODAYS_POMODORI_ERROR'
export const GET_TODAYS_COMPLETED_TASKS_REQUEST = 'GET_TODAYS_COMPLETED_TASKS_REQUEST'
export const GET_TODAYS_COMPLETED_TASKS_SUCCESS = 'GET_TODAYS_COMPLETED_TASKS_SUCCESS'
export const GET_TODAYS_COMPLETED_TASKS_ERROR = 'GET_TODAYS_COMPLETED_TASKS_ERROR'

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
