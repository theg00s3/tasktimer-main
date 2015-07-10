var React = require('react')
  , Alert = require('../components/Alert')

module.exports = React.createClass({
  render: function(){
    return  <footer role="footer">
              <div className="limit">
                <div className="limit tac">
                  <p>
                    <strong>by</strong> <a href="http://christian.fei.ninja" target="_blank">Christian Fei</a>
                  </p>
                  <p>
                    <strong>hosted on</strong> <a href="https://www.digitalocean.com/?refcode=880e8f681b50">digitalocean</a>
                  </p>
                </div>
                <div className="limit tac">
                  <strong>As seen on&nbsp;</strong>
                  <a href="http://www.producthunt.com/e/productivity-hacks" target="_blank">
                    <img width="120px" className="producthunt-logo" src="/assets/img/ph_logo.png" alt="As seen on ProductHunt"></img>
                  </a>
                </div>
                <div className="limit tac">
                  <p className="small light">
                    This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
                  </p>
                  <p className="small light">
                    The Pomodoro Technique® and Pomodoro™ are registered trademarks by Francesco Cirillo.
                  </p>
                </div>
                <div className="limit tac">
                  <a href="https://mixpanel.com/f/partner">
                    <img src="//cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics"/>
                  </a>
                </div>
              </div>
            </footer>
  }
})
