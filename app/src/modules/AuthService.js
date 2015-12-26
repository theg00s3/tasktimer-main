import axios from 'axios'

export default {
  authenticate
}

function authenticate(){
  return axios.get('/auth/info')
}
