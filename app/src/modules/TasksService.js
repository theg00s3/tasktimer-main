import axios from 'axios'
import DateUtils from './DateUtils'
const RESOURCE_URL = '/api/tasks'

export default {
  create,
  all,
  get,
  update,
  today,
}

function create(task){
  return axios.post(RESOURCE_URL, task)
}
function all(){
  return axios.get(RESOURCE_URL)
}
function get(taskId){
  return axios.get(`${RESOURCE_URL}/${taskId}`)
}
function update(taskId, task){
  return axios.put(`${RESOURCE_URL}/${taskId}`, task)
}
function today(){
  const todayDate = DateUtils.today()
  return axios.get(`${RESOURCE_URL}?day=${todayDate}&completed=true`)
}
