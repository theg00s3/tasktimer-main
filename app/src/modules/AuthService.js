var axios = require('axios')

var authenticatePromise

module.exports = {
  authenticate: authenticate
}

function authenticate(){
  return authenticatePromise ? authenticatePromise : doAuthenticate()
}

function doAuthenticate(){
  authenticatePromise = axios.get('/auth/info')
  return authenticatePromise
}
