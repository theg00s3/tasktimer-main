import React, {Component} from 'react'
import './MainFooter.styl'

export default class MainFooter extends Component {
  render () {
    return <footer className='main-footer-wrapper'>
      <div>
        <p>
          Follow us on <a href='https://twitter.com/pomodoro_cc' target='_blank'>Twitter</a> for the latest news! Also give us feedback and contact us for feature requests!
        </p>
        <p>
          For feedback, bug reports or pull requests, please use <a href='https://github.com/christian-fei/pomodoro.cc/' target='_blank'>Github</a> or contact us on <a href='https://twitter.com/pomodoro_cc' target='_blank'>Twitter</a>
        </p>
        <p>
          Made with &lt;3 by <a href='https://christianfei.com' target='_blank'>Christian Fei</a>
        </p>
        <small>
          This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
      </small>
      </div>
    </footer>
  }
}
