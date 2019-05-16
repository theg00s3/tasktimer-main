import React, {Component} from 'react'

export default class Open extends Component {
  render () {
    return <div className='content open'>
      <h1>Open stats of pomodoro.cc</h1>
      <p>Data from <strong>Google Analytics</strong> and <strong>Google Data Studio</strong></p>
      <iframe width='800' height='600' src='https://datastudio.google.com/embed/reporting/1YMIOWzefmW9Sf1dO3jfRnbV9uHbC1tuD/page/6Sbo' frameborder='0' style='border:0' allowfullscreen />
    </div>
  }
}
