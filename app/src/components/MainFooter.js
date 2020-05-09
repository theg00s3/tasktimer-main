import React, { Component } from 'react'
import './MainFooter.styl'

export default class MainFooter extends Component {
  render () {
    return <footer className='main-footer-wrapper'>
      <div>
        <p>
          For feedback, bug reports or pull requests, please use <a href='https://github.com/theg00s3/TaskTimer.tk/' target='_blank'>Github</a>
        </p>
        <p>
          <a href='/gdpr'>GDPR privacy policy</a> &nbsp; - &nbsp; <a href='/tos'>Terms of Service</a>
        </p>
        <p>
          This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
        </p>
      </div>
    </footer>
  }
}
