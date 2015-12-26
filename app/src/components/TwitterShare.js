require('./TwitterShare.styl')
import React, {Component, PropTypes} from 'react'

const defaultTweet = 'I\'m using @pomodoro_cc to get things done with the #pomodorotechnique, check it out on https://pomodoro.cc ! #productivity #gtd'
const defaultText = ''

export default class TwitterShare extends Component {
  render() {
    const {tweet, text} = this.props
    const resulTweet = encodeURIComponent(tweet || defaultTweet)
    const resulText = text || defaultText
    const twitterShareUrl = 'https://twitter.com/intent/tweet?text='+ resulTweet
    return  <div className="twitter-share">
              <a href={twitterShareUrl} target="_blank">
                <span>{resulText}&nbsp;</span>
                <i className="icon ion-social-twitter"></i>
              </a>
            </div>  }
}
TwitterShare.propTypes = {
  tweet: PropTypes.string,
  text:  PropTypes.string,
}
