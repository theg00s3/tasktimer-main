import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as actions from '../actions'
import './ImportExport.styl'

class ImportExport extends Component {
  download () {
    let data = Object.assign({}, this.props)
    delete data.actions
    if (typeof data === 'object') {
      data = JSON.stringify(data, undefined, 4)
    }

    const filename = 'pomooro.cc.json'
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

  render () {
    return <div className='import-export'>
      <h1>Import / Export</h1>
      <a class='export-action' href='#' onClick={() => this.download()}>Export to pomodoro.cc.json</a>
    </div>
  }
}

export default connect(
  (state) => ({
    todos: state.todos,
    settings: state.settings,
    pomodoros: state.pomodoros
  }),
  (dispatch) => ({
    actions: bindActionCreators(actions, dispatch)
  }))(ImportExport)
