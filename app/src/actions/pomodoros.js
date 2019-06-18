import AnalyticsService from '../modules/AnalyticsService'
import {apiCreatePomodoros, apiCreateTodos} from '.'

export function recreatePomodoros (pomodoros) {
  AnalyticsService.track('recreate-pomodoros', pomodoros)
  return apiCreatePomodoros(pomodoros)
}

export function recreateTodos (todos) {
  AnalyticsService.track('recreate-todos', todos)
  return apiCreateTodos(todos)
}
