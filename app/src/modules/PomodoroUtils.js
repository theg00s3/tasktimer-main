import { compose, filter, reduce } from 'ramda'
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

const filterCancelled = filter(pomodoro => {
  pomodoro = new Pomodoro(pomodoro)
  return !pomodoro.isCancelled()
})

const fullPomodoriHours = compose(
  reducePomodoriByFactor(60),
  filterCancelled
)
const partialPomodoriHours = reducePomodoriByFactor(60)
const partialPomodoriCount = reducePomodoriByFactor(POMODORO_DURATION)
const fullPomodoriCount = compose(
  reducePomodoriByFactor(POMODORO_DURATION),
  filterCancelled
)

export default {
  fullPomodoriCount,
  partialPomodoriCount,
  fullPomodoriHours,
  partialPomodoriHours,
}
