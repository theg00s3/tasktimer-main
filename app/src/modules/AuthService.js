var axios = require('axios')

var authenticatePromise

module.exports = {
  authenticate: authenticate
}

function authenticate(){
  if( !authenticatePromise ) {
    return doAuthenticate()
  }
  return authenticatePromise
}

function doAuthenticate(){
  authenticatePromise = axios.get('/auth/info')
  return authenticatePromise
}
