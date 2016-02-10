import AnalyticsService from '../modules/AnalyticsService'
import {updateTodo} from './'

export function undoTodoAction() {
  return (dispatch, getState) => {
    AnalyticsService.track('undo-todo-action')
    const {previousTodoState} = getState().undo
    if( previousTodoState ){
      return dispatch(updateTodo(previousTodoState))
    }
  }
}
