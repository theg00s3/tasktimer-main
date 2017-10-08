/*     */
import {
  ADD_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  GET_TODO_SUCCESS,
  UPDATE_TODO_SUCCESS,
  SWAP_TODO_LOCAL
} from '../actions/todos'

const defaultState = [{
  text: 'start a 25 minutes timer and get focussed!',
  _wizard: true
}, {
  text: 'take a break, start a 5 minute timer!',
  _wizard: true
}, {
  text: 'visit beta.pomodoro.cc',
  completed: true,
  _wizard: true
}, {
  text: 'something distracting',
  deleted: true,
  _wizard: true
}]

export default function todos (state = defaultState, action) {
  switch (action.type) {
    case GET_TODO_SUCCESS:
      state = action.payload.todos
      break
    case ADD_TODO_SUCCESS:
      state = addTodo(action.payload)(state)
      break
    case DELETE_TODO_SUCCESS:
    case UPDATE_TODO_SUCCESS:
      state = state.map(todo => (todo.id === action.payload.todo.id) ? action.payload.todo : todo)
      break
    case SWAP_TODO_LOCAL:
      state = action.payload.todos
      break
  }
  if (/TODO/.test(action.type)) return orderAndSanitize(state)
  return state
}

const addTodo = (todo) => {
  return (todos) => [...todos, todo]
}

const maxOfProp = (prop) => {
  return (acc, curr) => {
    if (notDefined(curr[prop])) {
      return acc
    }
    return (acc > curr[prop]) ? acc : curr[prop] + 1
  }
}
const maxId = maxOfProp('id')

const orderAndSanitize = (todos) => {
  return todos.map(sanitize)
}

const sanitize = (todo, index, todos) => {
  if (notDefined(todo.id)) {
    todo.id = todos.reduce(maxId, 0)
  }
  return todo
}

const notDefined = (x) => (x === undefined || x === null)
