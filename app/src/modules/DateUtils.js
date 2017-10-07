export default {
  today
}

function today () {
  const todayDate = new Date()
  return todayDate.getFullYear() + '/' + pad(todayDate.getMonth() + 1) + '/' + pad(todayDate.getDate())
}

function pad (number) {
  if (number < 10) {
    return `0${number}`
  }
  return number
}
