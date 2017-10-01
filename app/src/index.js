import Main        from './Main'
import React         from 'react'
import {render}      from 'react-dom'
import init          from './init'

require('normalize.css')
require('./index.styl')
require('./assets/images/pomodoro.cc.png')
require('./assets/images/pomodoro.cc.favicon.png')

require("react-tap-event-plugin")()
init()
render(<Main/>, document.getElementById('main'))
