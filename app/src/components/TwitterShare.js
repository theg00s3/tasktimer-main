var React = require('react')

var tweet = encodeURIComponent('I\'m using @pomodoro_cc to get things done using the #pomodorotechnique, check it out on https://pomodoro.cc ! #productivity #gtd')
var twitterShareUrl = 'https://twitter.com/intent/tweet?text='+ tweet


module.exports = React.createClass({
  render: function(){
    return  <div className="twitter-share">
              <a href={twitterShareUrl}>
                <i className="icon ion-social-twitter"></i>
              </a>
            </div>
  }
})
