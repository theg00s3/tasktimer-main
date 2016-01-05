import axios from 'axios'
import DateUtils from './DateUtils'
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
  const todayDate = DateUtils.today()
  return daily(todayDate)
}
