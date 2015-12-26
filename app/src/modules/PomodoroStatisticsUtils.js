import _ from 'underscore'
import PomodoroUtils from './PomodoroUtils'
const MINUTES = 60 * 1000
const minTimespan = 60*MINUTES
export default {
  calculateDailyPulseFrom,
  calculatGenericGraphFrom
}

function calculateDailyPulseFrom(data = []){
  const {startTimestamp, endTimestamp, timestamps} = calculateTimestamps(data)
  return _.map(timestamps, (timestamp) => {
    const y = 0
    const x = normalize(timestamp, startTimestamp, endTimestamp)
    return {y,x}
  })
}

function calculatGenericGraphFrom(data){
  const {startTimestamp, endTimestamp, timestamps} = calculateTimestamps(data)
  return _.map(data, (d) => {
    const timestamp = dateToTimestamp(d.started_at)
    const y = PomodoroUtils.calculateDurationInMinutes(d)
    const x = normalize(timestamp, startTimestamp, endTimestamp)
    return {y,x}
  })
}

function calculateTimestamps(data){
  const timestamps = _.map(data, (d) => dateToTimestamp(d.started_at))
  const startTimestamp = _.min(timestamps)
  let endTimestamp = _.max(timestamps)
  if( (startTimestamp + minTimespan) > endTimestamp ){
    endTimestamp = startTimestamp + minTimespan
  }
  return {startTimestamp, endTimestamp, timestamps}
}
function dateToTimestamp(date){
  return (new Date(date)).getTime()
}
function normalize(value, min, max) {
  return (value - min) / (max - min) * 100
}
