/*     */
import TimeFormatter from '../modules/TimeFormatter'
import {START_TIMER, RESUME_TIMER, STOP_TIMER, END_TIMER, TICK_TIMER} from '../actions/timer'

export default function timer (state = '00:00', action) {
  switch (action.type) {
    case START_TIMER: {
      return format(action.payload.minutes * 60)
    }
    case RESUME_TIMER: {
      return format(action.payload.remaining)
    }
    case END_TIMER: {
      return format(0)
    }
    case STOP_TIMER: {
      return format(0)
    }
    case TICK_TIMER: {
      return format(action.payload.remaining)
    }
  }
  return state
}

function format (seconds) {
  return TimeFormatter.formatSeconds(seconds)
}
