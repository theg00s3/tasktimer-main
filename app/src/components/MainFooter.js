require('./MainFooter.styl')
import React, {Component} from 'react'

export default class MainFooter extends Component {
  render () {
    return <footer className='main-footer-wrapper'>
      <div>
        <p>
                  Follow us on <a href='https://twitter.com/pomodoro_cc' target='_blank'>Twitter</a> for the latest news! Also give us feedback and contact us for feature requests!
                </p>
        <p>
                  Check out the <a href='/docs' id='docs-link'>developer documentation</a>!
                </p>
        <p>
                  For feedback, bug reports or pull requests, please use <a href='https://github.com/christian-fei/pomodoro.cc/' target='_blank'>Github</a> or contact us on <a href='https://twitter.com/pomodoro_cc' target='_blank'>Twitter</a>
        </p>
        <p>
                  by <a href='http://christian.fei.ninja' target='_blank'>Christian Fei</a>, hosted on <a href='https://www.digitalocean.com/?refcode=880e8f681b50' target='_blank'>digitalocean</a>
        </p>
        <small>
                  This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
                </small>
      </div>
    </footer>
  }
}
