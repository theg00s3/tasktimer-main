/*@flow*/
import PomodoroService from '../modules/PomodoroService'
export const GET_TODAYS_POMODORI_REQUEST = 'GET_TODAYS_POMODORI_REQUEST'
export const GET_TODAYS_POMODORI_SUCCESS = 'GET_TODAYS_POMODORI_SUCCESS'
export const GET_TODAYS_POMODORI_ERROR = 'GET_TODAYS_POMODORI_ERROR'

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
