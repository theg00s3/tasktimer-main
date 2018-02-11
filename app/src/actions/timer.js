/* eslint-disable camelcase */
import Timer from '../modules/Timer'
import TimeFormatter from '../modules/TimeFormatter'
import AnalyticsService from '../modules/AnalyticsService'
import {NOOP} from './'
import NotificationCenter from '../modules/NotificationCenter'
import NotificationService from '../modules/NotificationService'
export const START_TIMER = 'START_TIMER'
export const RESUME_TIMER = 'RESUME_TIMER'
export const END_TIMER = 'END_TIMER'
export const STOP_TIMER = 'STOP_TIMER'
export const RESET_TIMER = 'RESET_TIMER'
export const TICK_TIMER = 'TICK_TIMER'

const title = 'Pomodoro.cc - Time tracking with the Pomodoro technique'

function noop () {
  return {type: NOOP, payload: {}}
}

export function startTimer (minutes, type) {
  return (dispatch, getState) => {
    if (Timer.isInProgress()) { return noop() }
    Timer.start(minutes * 60)
    const started_at = new Date()
    const pomodoro = {minutes, type, started_at}
    AnalyticsService.track('timer-start', pomodoro)
    dispatch({type: START_TIMER, payload: pomodoro})
  }
}

export function resumeTimer (pomodoro) {
  if (Timer.isInProgress()) { return noop() }
  let remaining = 0
  if (pomodoro && pomodoro.minutes && pomodoro.started_at) {
    let elapsed = (Date.now() - new Date(pomodoro.started_at).getTime())
    elapsed = elapsed / 1000 << 0
    remaining = pomodoro.minutes * 60 - elapsed
  }
  remaining = remaining << 0
  if (remaining <= 0) {
    return {type: RESET_TIMER, payload: {}}
  }
  Timer.start(remaining)
  return {type: RESUME_TIMER, payload: {remaining}}
}

export function endTimer () {
  document.title = title
  NotificationCenter.emit('pomodoroEnded')
  NotificationService.show('Timer ended', {body: '', icon: 'https://pbs.twimg.com/profile_images/632545856428883968/hStIaGPQ_400x400.png'})
  return saveAndDispatch(END_TIMER)
}

export function forceEndTimer () {
  if (!Timer.isInProgress()) {
    return noop()
  }
  document.title = title
  NotificationCenter.emit('pomodoroEnded')
  Timer.forceEnd()
  return saveAndDispatch(STOP_TIMER)
}

export function tickTimer (remaining) {
  const formatted = TimeFormatter.formatSeconds(remaining)
  document.title = `${formatted} - ${title}`
  return {type: TICK_TIMER, payload: {remaining}}
}

function saveAndDispatch (action) {
  return (dispatch, getState) => {
    const pomodoro = getState().pomodoro

    pomodoro.finished = true
    if (action === STOP_TIMER) pomodoro.cancelled_at = new Date()

    dispatch({type: action, payload: {pomodoro}})
    AnalyticsService.track('timer-stop', pomodoro)
  }
}
