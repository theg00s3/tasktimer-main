var React = require('react')

module.exports = React.createClass({
  render: function(){
    return  <footer role="footer">
              <div className="limit">
                <div className="tac">
                  <ul className="menu">
                    <li>
                      <a href="/statistics">Statistics</a>
                    </li>
                    <li>
                      <a href="/about">About</a>
                    </li>
                    <li>
                      <a href="/blog">Blog</a>
                    </li>
                  </ul>
                </div>
                <div className="tac">
                  <p className="inline">
                    <strong>by</strong> <a href="http://christian.fei.ninja" target="_blank">Christian Fei</a>
                  </p>
                  <p className="inline">
                    <strong>As seen on&nbsp;</strong>
                    <a href="http://www.producthunt.com/e/productivity-hacks" target="_blank">
                      <img width="120px" className="producthunt-logo" src="/assets/img/ph_logo.png" alt="As seen on ProductHunt"></img>
                    </a>
                  </p>
                  <p className="inline">
                    <strong>hosted on</strong> <a href="https://www.digitalocean.com/?refcode=880e8f681b50">digitalocean</a>
                  </p>
                </div>
                <div className="tac">
                  <p className="small light">
                    This application is not affiliated, associated or endorsed by the Pomodoro Technique® or Francesco Cirillo.
                  </p>
                </div>
                <div className="tac">
                  <p className="inline">
                    <a href="https://mixpanel.com/f/partner">
                      <img src="//cdn.mxpnl.com/site_media/images/partner/badge_light.png" alt="Mobile Analytics"/>
                    </a>
                  </p>
                </div>
              </div>
            </footer>
  }
})
