import AnalyticsService from '../modules/AnalyticsService'
import { ENABLE_DARK_MODE, DISABLE_DARK_MODE, TOGGLE_DARK_MODE } from '../reducers/dark-mode'

export function enableDarkMode () {
  return (dispatch, getState) => {
    AnalyticsService.track('enable-dark-mode')
    dispatch({type: ENABLE_DARK_MODE, payload: null})
  }
}

export function disableDarkMode () {
  return (dispatch, getState) => {
    AnalyticsService.track('disable-dark-mode')
    dispatch({type: DISABLE_DARK_MODE, payload: null})
  }
}
export function toggleDarkMode () {
  return (dispatch, getState) => {
    AnalyticsService.track('toggle-dark-mode')
    dispatch({type: TOGGLE_DARK_MODE, payload: null})
  }
}
