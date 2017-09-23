import { compose, concat, head, last, length, map, prop, reduce, sort, sortBy } from 'ramda'
import Pomodoro from '../models/Pomodoro'

const MINUTES = 60 * 1000
const minTimespan = 60 * MINUTES

const pad = (number) => (number < 10) ? `0${number}` : number
const sortMax = (a, b) => a - b
const sortMin = (a, b) => b - a
const sortByStartedAt = sortBy(prop('started_at'))

const toFullTimestamp = (ts) => {
  const date = new Date(ts)
  const x = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
  return x.getTime()
}

const normalizeXAxis = (ts) => {
  if (length(ts) < 2) { return ts }
  ts = concat([head(ts) - 60 * MINUTES], ts)
  ts = concat(ts, [last(ts) + 60 * MINUTES])
  return ts
}

const extractStartedAt = compose(
  map(prop('started_at')),
  map((p) => p.timestamps()),
  map((p) => new Pomodoro(p))
)

const calculateTimestamps = (data = []) => {
  const timestamps = extractStartedAt(data)
  const startTimestamp = head(sort(sortMax, timestamps))
  let endTimestamp = head(sort(sortMin, timestamps))
  if ((startTimestamp + minTimespan) > endTimestamp) {
    endTimestamp = startTimestamp + minTimespan
  }
  return {startTimestamp, endTimestamp, timestamps}
}

const extractStartAndEndFor = (pomodoro) => {
  pomodoro = new Pomodoro(pomodoro)
  const {started_at, ended_at} = pomodoro.timestamps()
  const y = pomodoro.duration() / MINUTES
  return [{x: started_at, y}, {x: ended_at, y: 0}]
}

const extractGraph = reduce((acc, value) => {
  const [start, end] = extractStartAndEndFor(value)
  return concat(acc, [start, end])
}, [])

const extractXAxis = compose(
  normalizeXAxis,
  sort(sortMax),
  map(toFullTimestamp),
  prop('timestamps'),
  calculateTimestamps
)

const calculatGenericChartFrom = (data = []) => {
  let graph = extractGraph(data)
  const firstPomodoro = head(graph)
  if (firstPomodoro) {
    const x = firstPomodoro.x
    graph = concat([{x: x, y: 0}], graph)
  }
  let lastPomodoro = last(sortByStartedAt(data))
  if (lastPomodoro) {
    const {ended_at} = (new Pomodoro(lastPomodoro)).timestamps()
    graph = concat(graph, [{x: ended_at, y: 0}])
  }

  const xAxis = extractXAxis(data)
  return {graph, xAxis}
}

const formatTimestampToHour = (ts) => {
  const date = new Date(ts)
  return pad(date.getHours()) + ':' + pad(date.getMinutes())
}

export default {
  calculatGenericChartFrom,
  formatTimestampToHour
}
