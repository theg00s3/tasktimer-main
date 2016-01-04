import axios from 'axios'
const RESOURCE_URL = '/api/pomodoros'

export default {
  create,
  daily,
  today,
}


function create(pomodoro){
  return axios.post(`${RESOURCE_URL}`, pomodoro)
}

function daily(day){
  return axios.get(`${RESOURCE_URL}?day=${day}`)
}

function today(){
  const todayDate = new Date
  const day = todayDate.getFullYear() + '/' + pad(todayDate.getMonth()+1) + '/' + pad(todayDate.getDate()-1)
  return daily(day)
}

function pad(number) {
  if( number < 10 ) {
    return `0${number}`
  }
  return number
}
