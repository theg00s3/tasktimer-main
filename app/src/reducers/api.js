import {
  API_GET_POMODOROS_FOR_DATE_SUCCESS,
  API_GET_POMODOROS_FOR_DATE_ERROR,
  API_GET_TODOS_FOR_DAY_SUCCESS,
  API_GET_TODOS_FOR_DAY_ERROR,
  API_UPDATE_TODO_SUCCESS,
  API_GET_TODOLIST_SUCCESS,
  API_GET_TODOLIST_ERROR
} from '../actions'

export const defaultState = {
  pomodorosForDate: {
    date: undefined,
    pomodoros: []
  },
  todosForDate: {
    date: undefined,
    todos: []
  },
  todolist: []
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
    case API_GET_TODOS_FOR_DAY_SUCCESS:
      return Object.assign({}, state, {
        todosForDate: {
          date: action.payload.date,
          todos: action.payload.todos
        }
      })
    case API_GET_TODOS_FOR_DAY_ERROR:
      return Object.assign({}, state, {
        todosForDate: defaultState.todosForDate
      })
    case API_GET_TODOLIST_SUCCESS:
      return Object.assign({}, state, {
        todolist: action.payload.todos
      })
    case API_GET_TODOLIST_ERROR:
      return Object.assign({}, state, {
        todolist: defaultState.todos
      })
    case API_UPDATE_TODO_SUCCESS:
      return Object.assign({}, state, {
        todolist: state.todolist.map(t => {
          if (t !== action.payload._id) return t
          return action.payload.todo
        })
      })
    default:
      return state
  }
}
