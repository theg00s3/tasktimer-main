import axios from 'axios'
import DateUtils from './DateUtils'
const RESOURCE_URL = '/api/pomodoros'

export default {
  create,
  update,
  daily,
  today,
  unfinished,
}


function create(pomodoro){
  return axios.post(`${RESOURCE_URL}`, pomodoro)
}
function update(pomodoro){
  return axios.put(`${RESOURCE_URL}/${pomodoro.id}`, pomodoro)
}

function daily(day){
  return axios.get(`${RESOURCE_URL}?day=${day}`)
}

function unfinished(){
  return axios.get(`${RESOURCE_URL}?unfinished=true`)
}

function today(){
  const todayDate = DateUtils.today()
  return daily(todayDate)
}
