import React from 'react'
import { render } from 'react-dom'
import Main from './Main'
import * as Sentry from '@sentry/browser'
import init from './init'
import './index.styl'
Sentry.init({
  dsn: 'https://9aae5ab6d2834abd9bcd4bb4af9d6ea1@o389094.ingest.sentry.io/5226816'
})

init()
render(<Main />, document.getElementById('main'))
