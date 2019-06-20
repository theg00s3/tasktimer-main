import React, { Component } from 'react'
import tweetImage from '../assets/images/tweet.png'

class TweetButton extends Component {
  render () {
    const { pomodoros } = this.props
    const text = `Today I worked ${pomodoros.length} pomodoro for a total of ${(pomodoros.length * 25 / 60).toFixed(1)} hours using @pomodoro_cc`

    let url = `http://twitter.com/share?text=${text}`
    url += `&url=https://pomodoro.cc`
    url += `&hashtags=pomodoro,pomodorotechnique`

    return <div className='tweet-button-container'>
      <a class='twitter-share-button' href={url} target='_blank' data-size='large'><img height={24} src={tweetImage} /></a>
    </div>
  }
}

export default TweetButton
