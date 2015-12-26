import axios from 'axios'

const TasksService = {
  create: create,
  all: all,
  get: get,
  update: update,
}

export default TasksService

function create(task){
  return axios.post('/api/tasks', task)
}
function all(){
  return axios.get('/api/tasks')
}
function get(taskId){
  return axios.get(`/api/tasks/${taskId}`)
}
function update(taskId, task){
  return axios.put(`/api/tasks/${taskId}`, task)
}
