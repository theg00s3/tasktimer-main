import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Link from '../components/utils/Link'
import * as actions from '../actions'
import './Export.styl'

class Export extends Component {
  download () {
    const filename = 'pomooro.cc.json'
    const data = Object.assign({}, this.props)
    triggerDownload(filename, data)
  }

  render () {
    const {user} = this.props
    if (!user) {
      return <div class='content export'>
        <p>
          Please <Link href='/login'>login</Link> to <strong>export</strong> your pomodoro.cc settings, pomodoros and todos!
        </p>

        <h2>Example</h2>
        <small>not enabled when logged out</small>

        <div class='example'>
          <h4>
            Create your backup to use it later.
          </h4>

          <Link class='export-action' href='/export'>Export to pomodoro.cc.json</Link>>
        </div>
      </div>
    }

    return <div className='content export'>
      <h4>
        Create your backup to use it later.
      </h4>

      <a class='export-action' href='#' onClick={() => this.download()}>Export to pomodoro.cc.json</a>
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros,
  user: state.user
}), (dispatch) => ({
  actions: bindActionCreators(actions, dispatch)
}))(Export)

function triggerDownload (filename, data) {
  data = JSON.stringify(data, undefined, 4)
  const blob = new window.Blob([data], {type: 'text/json'})
  const e = document.createEvent('MouseEvents')
  const a = document.createElement('a')

  a.download = filename
  a.href = window.URL.createObjectURL(blob)
  a.dataset.downloadurl = ['text/json', a.download, a.href].join(':')
  e.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
  a.dispatchEvent(e)
  window.event.preventDefault()
}
