import { API_GET_POMODOROS_FOR_DATE_SUCCESS, API_GET_POMODOROS_FOR_DATE_ERROR, GET_TODOS_SUCCESS, GET_TODOS_ERROR, UPDATE_TODO_SUCCESS, UPDATE_TODO_ERROR } from '../actions'

export const defaultState = {
  pomodorosForDate: {
    date: undefined,
    pomodoros: []
  },
  todos: []
}

export default function user (state = defaultState, action) {
  switch (action.type) {
    case API_GET_POMODOROS_FOR_DATE_SUCCESS:
      return Object.assign({}, state, {
        pomodorosForDate: {
          date: action.payload.date,
          pomodoros: action.payload.pomodoros
        }
      })
    case API_GET_POMODOROS_FOR_DATE_ERROR:
      return Object.assign({}, state, {
        pomodorosForDate: defaultState.pomodorosForDate
      })
    case GET_TODOS_SUCCESS:
      return Object.assign({}, state, {
        todos: action.payload.todos
      })
    case GET_TODOS_ERROR:
      return Object.assign({}, state, {
        todos: defaultState.todos
      })
    case UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todos: state.todos.map(t => {
          if (t !== action.payload.todo._id) return t
          return action.payload.todo
        })
      })
    case UPDATE_TODO_ERROR:
      return state
    default:
      return state
  }
}
