import Main from './Main'
import React from 'react'
import {render} from 'react-dom'
import init from './init'
const r2 = require('r2')

require('normalize.css')
import './index.styl'
require('./assets/images/pomodoro.cc.png')
require('./assets/images/pomodoro.cc.favicon.png')

init()
render(<Main />, document.getElementById('main'))

global.stripePopup = window.StripeCheckout.configure({
  key: 'pk_test_Gt6s9XSmSCFTtIKgoGMmQKCQ',
  token: function (token) {
    console.log('token', token)
    // r2.post('http://localhost:3000/', {
    r2.post('https://cild3w46be.execute-api.us-west-2.amazonaws.com/development/', {
      json: {
        stripeToken: token,
        stripeEmail: token.email
      }
    }).json
    .then(data => {
      console.log('data', data)
    })
  }
})