import {TRACK_DISTRACTION, TEST_DISTRACTIONS} from '../actions'

export const defaultState = {lastTracked: null, tracked: []}

export default function distractions (state = defaultState, action) {
  switch (action.type) {
    case TRACK_DISTRACTION: {
      return {
        lastTracked: action.payload,
        tracked: state.tracked.concat([action.payload])
      }
    }
    case TEST_DISTRACTIONS: {
      const now = Date.now() // +new Date()
      const MINUTES = 1000 * 60
      return {
        lastTracked: state.lastTracked,
        tracked: [
          new Date(now - MINUTES * 15),
          new Date(now - MINUTES * 45),
          new Date(now - MINUTES * 78),
          new Date(now - MINUTES * 120)
        ]
      }
    }
  }
  return state
}
