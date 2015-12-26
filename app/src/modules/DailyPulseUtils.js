import _ from 'underscore'
const MINUTES = 60 * 1000
const minTimespan = 60*MINUTES
export default {
  calculateFrom
}

function calculateFrom(data){
  data = data || []
  const timestamps = _.map(data, (d) => dateToTimestamp(d.started_at))
  const minTimestamp = _.min(timestamps)
  let maxTimestamp = _.max(timestamps)
  if( (minTimestamp + minTimespan) > maxTimestamp ){
    maxTimestamp = minTimestamp + minTimespan
  }
  const timespan = maxTimestamp - minTimestamp
  return _.map(data, (d) => {
    const ts = dateToTimestamp(d.started_at)
    const y = 0
    const x = 100 * normalize(ts, minTimestamp, maxTimestamp)
    return {y,x}
  })
}
function dateToTimestamp(date){
  return (new Date(date)).getTime()
}
function normalize(value, min, max) {
  return (value - min) / (max - min) || 0
}
