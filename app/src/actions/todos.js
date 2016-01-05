/*@flow*/
import AnalyticsService from '../modules/AnalyticsService'
import TasksService from '../modules/TasksService'
import {isLoggedIn} from '../modules/Utils'
import {getTodaysCompletedTasks} from './'

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

export function getTodo() {
  return (dispatch, getState) => {
    dispatch({type:GET_TODO_REQUEST, payload:{}})
    TasksService.all()
    .then((response) => {
      const todos = response.data
      dispatch({type:GET_TODO_SUCCESS, payload:{todos}})
    })
    .catch((error) => {
      dispatch({type:GET_TODO_ERROR, payload:{error}})
    })
  }
}

export function addTodo(todo:Todo):Action{
  AnalyticsService.track('add-todo', todo)
  return (dispatch, getState) => {
    const {user} = getState()
    if( !isLoggedIn(user) ){
      return dispatch({type:ADD_TODO_SUCCESS,payload:todo})
    }
    dispatch({type:ADD_TODO_REQUEST,payload:{}})
    TasksService.create(todo)
    .then((response) => {
      const todo = response.data
      dispatch({type:ADD_TODO_SUCCESS,payload:todo})
    })
    .catch(() => {
      dispatch({type:ADD_TODO_ERROR,payload:{}})
    })
  }
}

export function deleteTodo(todo:Todo):Action {
  AnalyticsService.track('delete-todo', todo)
  return (dispatch, getState) => {
    const {user} = getState()
    if( !isLoggedIn(user) ){
      return dispatch({type:DELETE_TODO_SUCCESS,payload:todo})
    }
    dispatch({type:DELETE_TODO_REQUEST,payload:{}})
    TasksService.update(todo.id, {
      ...todo,
      deleted: true,
    })
    .then(() => {
      dispatch({type:DELETE_TODO_SUCCESS,payload:todo})
    })
    .catch(() => {
      dispatch({type:DELETE_TODO_ERROR,payload:{}})
    })
  }
}

export function toggleCompleteTodo(todo:Todo):Action {
  return updateTodo({
    ...todo,
    completed: !todo.completed
  })
}

export function updateTodo(todo:Todo):Action {
  AnalyticsService.track('update-todo', todo)
  return (dispatch, getState) => {
    const {user} = getState()
    if( !isLoggedIn(user) ){
      return dispatch({type:UPDATE_TODO_SUCCESS,payload:todo})
    }
    dispatch({type:UPDATE_TODO_REQUEST,payload:{}})
    TasksService.update(todo.id, todo)
    .then(() => {
      dispatch({type:UPDATE_TODO_SUCCESS,payload:todo})
      dispatch(getTodaysCompletedTasks())
    })
    .catch(() => {
      dispatch({type:UPDATE_TODO_ERROR,payload:{}})
    })
  }
}
