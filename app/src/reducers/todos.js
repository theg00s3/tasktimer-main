/*@flow*/
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS
} from '../actions/todos'

import _ from 'underscore'

export default function todos(state:TodoState=[], action:Action):TodoState {
  switch(action.type){
  case GET_TODO_SUCCESS: {
    return action.payload.todos
  }
  case ADD_TODO_SUCCESS: {
    let newTodo = action.payload
    if( !newTodo.id ){
      newTodo.id = state.reduce(max, 0)
    }
    return sortCompleted([
      ...state,
      newTodo
    ])
  }
  case DELETE_TODO_SUCCESS: {
    return sortCompleted(state.filter((todo) => {
      return todo.text !== action.payload.text
    }))
  }
  case UPDATE_TODO_SUCCESS: {
    return sortCompleted(state.map((todo) => {
      return (todo.id !== action.payload.id)
              ? todo
              : action.payload
    }))
  }
  }
  return state
}

const max = (acc, curr) => (acc > curr.id ? acc : curr.id+1)

const sortCompleted = (todos) => {
  return todos
  .sort((t1, t2) => {
    return t1.completed >= t2.completed
  })
  .sort((t1,t2) => {
    if( t1.completed !== t2.completed ) {
      return 0
    }
    return t1.id > t2.id
  })
}

