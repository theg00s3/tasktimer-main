module.exports = {
  create: create
}

var axios = require('axios')

var API_BASE_URL = '/api'

var POMODORO_RESOURCE_URL = '/pomodoro'


function create(pomodoro){
  return axios.post(API_BASE_URL + POMODORO_RESOURCE_URL, pomodoro)
}
