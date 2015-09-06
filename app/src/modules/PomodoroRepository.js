module.exports = {
  create: create,
  getForDay: getForDay,
  POMODORO_ERROR_OVERLAPPING: 403,
  POMODORO_ERROR_INVALID: 422
}

var axios = require('axios')

var API_BASE_URL = '/api'

var POMODORO_RESOURCE_URL = '/pomodoro'


function create(pomodoro){
  return axios.post(API_BASE_URL + POMODORO_RESOURCE_URL, pomodoro)
}

function getForDay(day){
  return axios.get(API_BASE_URL + POMODORO_RESOURCE_URL, {
    params: {
      day: day
    }
  })
}