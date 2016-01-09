import AnalyticsService from '../modules/AnalyticsService'
import {updateTodo} from './'
export const AUTHENTICATE_USER_REQUEST = 'AUTHENTICATE_USER_REQUEST'
export const AUTHENTICATE_USER_SUCCESS = 'AUTHENTICATE_USER_SUCCESS'
export const AUTHENTICATE_USER_FAILURE = 'AUTHENTICATE_USER_FAILURE'

export function undoTodoAction() {
  return (dispatch, getState) => {
    AnalyticsService.track('undo-todo-action')
    const {previousTodoState} = getState().undo
    if( previousTodoState ){
      return dispatch(updateTodo(previousTodoState))
    }
  }
}
