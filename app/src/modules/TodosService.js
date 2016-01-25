import axios from 'axios'
import DateUtils from './DateUtils'
const RESOURCE_URL = '/api/todos'

export default {
  create,
  all,
  get,
  update,
  today,
}

function create(todo){
  return axios.post(RESOURCE_URL, todo)
}
function all(){
  return axios.get(RESOURCE_URL)
}
function get(todoId){
  return axios.get(`${RESOURCE_URL}/${todoId}`)
}
function update(todoId, todo){
  return axios.put(`${RESOURCE_URL}/${todoId}`, todo)
}
function today(){
  const todayDate = DateUtils.today()
  return axios.get(`${RESOURCE_URL}?day=${todayDate}&completed=true`)
}
