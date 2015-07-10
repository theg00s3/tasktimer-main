var React = require('react')
  , Alert = require('../components/Alert')

module.exports = React.createClass({
  render: function(){
    return  <footer role="footer">
              <div className="limit">
                <div className="limit tac">
                  <Alert>
                    <i className="icon ion-information-circled"></i> &nbsp;
                    <strong>As seen on <a href="http://www.producthunt.com/e/productivity-hacks" target="_blank">ProductHunt</a></strong>
                  </Alert>
                </div>
                <div className="limit tac">
                  <p>
                    by <a href="http://christian.fei.ninja" target="_blank">Christian Fei</a>
                  </p>
                  <p>
                    hosted on <a href="https://www.digitalocean.com/?refcode=880e8f681b50">digitalocean</a>
                  </p>
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
