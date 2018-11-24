import {TRACK_DISTRACTION, TEST_DISTRACTIONS} from '../actions'

export const defaultState = {lastTracked: null, tracked: []}

export default function distractions (state = defaultState, action) {
  switch (action.type) {
    case TRACK_DISTRACTION: {
      return {
        lastTracked: +new Date(state.lastTracked) > +new Date() - 1000 * 4,
        distractionTrackText: state.tracked.length % 2 === 0 ? 'Being distracted? 😅' : 'Track distraction 💥',
        tracked: state.tracked.concat([action.payload])
      }
    }
    case TEST_DISTRACTIONS: {
      const now = Date.now() // +new Date()
      const MINUTES = 1000 * 60
      return {
        lastTracked: new Date(),
        distractionTrackText: state.tracked.length % 2 === 0 ? 'Being distracted? 😅' : 'Track distraction 💥',
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
