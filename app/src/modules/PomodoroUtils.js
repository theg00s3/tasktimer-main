import { reduce } from 'ramda'
import Pomodoro from '../models/Pomodoro'

const MINUTES = 60 * 1000
const POMODORO_DURATION = 25

const reducePomodoriByFactor = (factor) => {
  const reducer = reduce((acc, value) => {
    const pomodoro = new Pomodoro(value)
    if( pomodoro.isType('pomodoro') ){
      acc += pomodoro.duration() / MINUTES / factor
    }
    return acc
  }, 0)

  return (data) => {
    const reduced = reducer(data)
    return new Number(reduced).toFixed(1)
  }
}

const pomodoriHours = reducePomodoriByFactor(60)
const pomodoriCount = reducePomodoriByFactor(POMODORO_DURATION)
export default {
  pomodoriCount,
  pomodoriHours,
}
