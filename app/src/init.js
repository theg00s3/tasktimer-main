require('nprogress/nprogress.css')
import Timer       from './modules/Timer'
import Sounds      from './modules/Sounds'
import {getState, dispatch}  from './reduxStore'
import {
  tickTimer,
  endTimer,
  authenticateUser,
  getTodo,
  getTodaysPomodori,
  getTodaysCompletedTasks,
  getUnfinishedPomodoro,
} from './actions'

export default function init() {
  dispatch(authenticateUser())
  dispatch(getTodo())
  dispatch(getTodaysPomodori())
  dispatch(getTodaysCompletedTasks())
  dispatch(getUnfinishedPomodoro())

  Timer.on('tick', (remaining, total) => {
    const state = getState()
    if( state.settings.tickSoundEnabled ){
      Sounds.startTickingSound()
    }
    dispatch(tickTimer(remaining))
  })

  Timer.on('forceEnd', playTimerEndSound)
  Timer.on('end', () => {
    dispatch(endTimer())
    playTimerEndSound()
    dispatch(getTodaysPomodori())
    dispatch(getTodaysCompletedTasks())
  })

  function playTimerEndSound() {
    const state = getState()
    Sounds.stopTickingSound()
    if( state.settings.ringSoundEnabled ){
      Sounds.startRingingSound()
    }
  }
}
