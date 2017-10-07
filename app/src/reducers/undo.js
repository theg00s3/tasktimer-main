import {
/*
  ADD_TODO_SUCCESS,
*/
  DELETE_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../actions'

export const defaultState = {
  previousTodoState: undefined
}

export default function undo (state = defaultState, action) {
  switch (action.type) {
    case UPDATE_TODO_SUCCESS:
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        previousTodoState: action.payload.oldTodo
      }
  }
  return state
}
