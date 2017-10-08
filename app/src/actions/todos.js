import AnalyticsService from '../modules/AnalyticsService'
import NotificationCenter from '../modules/NotificationCenter'

export const ADD_TODO_REQUEST = 'ADD_TODO_REQUEST'
export const ADD_TODO_SUCCESS = 'ADD_TODO_SUCCESS'
export const ADD_TODO_ERROR = 'ADD_TODO_ERROR'
export const DELETE_TODO_REQUEST = 'DELETE_TODO_REQUEST'
export const DELETE_TODO_SUCCESS = 'DELETE_TODO_SUCCESS'
export const DELETE_TODO_ERROR = 'DELETE_TODO_ERROR'
export const GET_TODO_REQUEST = 'GET_TODO_REQUEST'
export const GET_TODO_SUCCESS = 'GET_TODO_SUCCESS'
export const GET_TODO_ERROR = 'GET_TODO_ERROR'
export const UPDATE_TODO_REQUEST = 'UPDATE_TODO_REQUEST'
export const UPDATE_TODO_SUCCESS = 'UPDATE_TODO_SUCCESS'
export const UPDATE_TODO_ERROR = 'UPDATE_TODO_ERROR'
export const SWAP_TODO_REQUEST = 'SWAP_TODO_REQUEST'
export const SWAP_TODO_SUCCESS = 'SWAP_TODO_SUCCESS'
export const SWAP_TODO_ERROR = 'SWAP_TODO_ERROR'
export const SWAP_TODO_LOCAL = 'SWAP_TODO_LOCAL'

export function addTodo (todo) {
  AnalyticsService.track('add-todo', todo)
  return (dispatch, getState) => {
    return dispatch({type: ADD_TODO_SUCCESS, payload: todo})
  }
}

export function toggleCompleteTodo (todo) {
  const completed = !todo.completed
  const updatedTodo = {...todo, completed}
  if (completed) updatedTodo.completed_at = new Date()
  else delete updatedTodo.completed_at
  return updateTodo(updatedTodo, 'UPDATE')
}

export function toggleDeleteTodo (todo) {
  const deleted = !todo.deleted
  const updatedTodo = {...todo, deleted}
  if (deleted) updatedTodo.deleted_at = new Date()
  else delete updatedTodo.deleted_at
  return updateTodo(updatedTodo, 'DELETE')
}

export function updateTodo (todo, type = 'UPDATE') {
  AnalyticsService.track('update-todo', todo)
  return (dispatch, getState) => {
    NotificationCenter.emit('updateTodo')
    const {todos} = getState()
    const [oldTodo] = todos.filter(({id}) => todo.id === id)
    return dispatch({type: `${type}_TODO_SUCCESS`, payload: {todo, oldTodo}})
  }
}
