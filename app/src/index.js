import React from 'react'
import { render } from 'react-dom'
import Main from './Main'
import * as Sentry from '@sentry/browser'
import init from './init'
import './index.styl'
Sentry.init({
  dsn: 'https://4290a23ad5414f8693127ceba916795e@sentry.io/1462419'
})

init()
render(<Main />, document.getElementById('main'))
