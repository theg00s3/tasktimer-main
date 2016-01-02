import { compose, concat, curry, head, filter, last, length, map, prop, reduce, sort } from 'ramda'
import PomodoroUtils from './PomodoroUtils'
const MINUTES = 60 * 1000
const POMODORO_DURATION = 25
const minTimespan = 60*MINUTES

const pad = (number) => (number<10) ? `0${number}` : number

const sortMax = (a,b) => a - b
const sortMin = (a,b) => b - a

const pomodoriCount = reduce((acc, pomodoro) => {
  acc = new Number(acc)
  if( pomodoro.type === 'pomodoro' ) {
    if( pomodoro.cancelled_at ){
      const durationInMillis = (new Date(pomodoro.cancelled_at)).getTime() - (new Date(pomodoro.started_at)).getTime()
      acc += durationInMillis / MINUTES / POMODORO_DURATION
    } else {
      acc += 1
    }
  }
  return new Number(acc).toFixed(1)
}, 0.0)

const timestampToCoordinates = ({startTimestamp, endTimestamp, timestamps}) => {
  return map(timestamp => {
    const x = normalize(timestamp, startTimestamp, endTimestamp)
    return {y:0,x}
  }, timestamps)
}

const calculateDailyPulseFrom = compose(
  timestampToCoordinates,
  calculateTimestamps
)

const extractGraph = map((d) => {
  const x = dateToTimestamp(d.started_at)
  const y = PomodoroUtils.calculateDurationInMinutes(d)
  return {y,x}
})

const extractXAxis = compose(
  normalizeXAxis,
  sort(sortMax),
  map(toFullTimestamp),
  prop('timestamps'),
  calculateTimestamps
)

function normalizeXAxis(ts) {
  if( length(ts) < 2 ) {return ts}
  ts = concat([head(ts) - 60*MINUTES], ts)
  ts = concat(ts, [last(ts) + 60*MINUTES])
  return ts
}

function toFullTimestamp(ts){
  const date = new Date(ts)
  const x = new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours())
  return dateToTimestamp(x)
}

function calculatGenericChartFrom(data=[]){
  const {startTimestamp, endTimestamp, timestamps} = calculateTimestamps(data)
  const graph = extractGraph(data)
  const xAxis = extractXAxis(data)
  return {graph, xAxis}
}

function formatTimestampToHour(ts){
  const date = new Date(ts)
  return pad(date.getHours()) + ':' + pad(date.getMinutes())
}

function calculateTimestamps(data=[]){
  const timestamps = map((d) => dateToTimestamp(d.started_at), data)
  const startTimestamp = head(sort(sortMax, timestamps))
  let endTimestamp = head(sort(sortMin, timestamps))
  if( (startTimestamp + minTimespan) > endTimestamp ){
    endTimestamp = startTimestamp + minTimespan
  }
  return {startTimestamp, endTimestamp, timestamps}
}
function dateToTimestamp(date){
  return +(new Date(date))
}
function normalize(value, min, max) {
  return Math.abs((value - min) / (max - min) * 100)
}





export default {
  calculateDailyPulseFrom,
  calculatGenericChartFrom,
  formatTimestampToHour,
  pomodoriCount
}
