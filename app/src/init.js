import Timer from './modules/Timer'
import Sounds from './modules/Sounds'
import reduxStore from './reduxStore'
import {tickTimer, endTimer, loadUser} from './actions'

require('nprogress/nprogress.css')

const {getState, dispatch} = reduxStore

export default function init () {
  Timer.on('tick', (remaining, total) => {
    const state = getState()
    if (state.settings.tickSoundEnabled) {
      Sounds.startTickingSound()
    }
    dispatch(tickTimer(remaining))
  })

  dispatch(loadUser())
  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    dispatch(endTimer())
    playTimerEndSound()
  })

  function playTimerEndSound () {
    const state = getState()
    Sounds.stopTickingSound()
    if (state.settings.ringSoundEnabled) {
      Sounds.startRingingSound()
    }
  }
}
