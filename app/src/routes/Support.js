import React, {Component} from 'react'
const logo = require('../assets/images/pomodoro.cc.png')

export default class Support extends Component {
  render () {
    return <div className='content support'>
      <img className='support-image' src={logo} />
      <h1>Pomodoro.cc needs your support!</h1>
      <h3 className='light'>
                Every donation is very much appreciated.
              </h3>
      <h3 className='light'>
                With your support <strong>you</strong> can help us sustain the service costs and make it possible to continue to provide a free service.
              </h3>
      <p>
                We strongly believe in distractions free work and thus decided <strong>to not show ads</strong>.
              </p>

      <p>
        Also, consider donating a coffee in terms of some crypto:

        <br />
        <br />

        <a href='litecoin:LbGvb3yyWpo7kqtxzREdcHek9st6tGyqmb' style='padding: 3em'>donate litecoin</a>

        <a href='bitcoin:35Hy1xYjsuGF47frqA9a8HJKhJQ9rcSV4j' style='padding: 3em'>donate bitcoin</a>
      </p>
    </div>
  }
}
