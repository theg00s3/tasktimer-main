export default {
  formatSeconds
}

function formatSeconds (seconds) {
  if (!seconds || seconds < 0) {
    return '00:00'
  }
  const minutes = parseInt(seconds / 60, 10)
  const secondsRemainder = parseInt(seconds % 60, 10)
  return pad(minutes) + ':' + pad(secondsRemainder)
}

function pad (number) {
  return (number < 10) ? ('0' + number) : ('' + number)
}
