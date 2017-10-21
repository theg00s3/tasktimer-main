import Main from './Main'
import React from 'react'
import {render} from 'react-dom'
import init from './init'
import './index.styl'
import 'normalize.css'
import './assets/images/pomodoro.cc.png'
import './assets/images/pomodoro.cc.favicon.png'

init()
render(<Main />, document.getElementById('main'))
