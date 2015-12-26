require('./Support.styl')
import React, {Component} from 'react'
export default class Support extends Component {
  render() {
    return  <div className="content support">
              <img className="support-image" src="https://pbs.twimg.com/profile_images/632545856428883968/hStIaGPQ.png"/>
              <h1>Pomodoro.cc needs your support!</h1>
              <h3 className="light">
                Every <a href="https://gratipay.com/pomodoro-cc/" target="_blank">donation</a> is very much appreciated.
              </h3>
              <h3 className="light">
                With your support <strong>you</strong> can help us sustain the service costs and make it possible to continue to provide a free service.
              </h3>
              <p>
                We strongly believe in distractions free work and thus decided <strong>to not show ads</strong>.
              </p>
            </div>
  }
}
