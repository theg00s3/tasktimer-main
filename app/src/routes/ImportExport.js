import React, {Component} from 'react'
import {connect} from 'react-redux'
import './ImportExport.styl'

class ImportExport extends Component {
  download () {
    const filename = 'pomooro.cc.json'
    const data = Object.assign({}, this.props)
    triggerDownload(filename, data)
  }

  importFile () {
    const file = window.event.target.files[0]
    console.log('file', file)
    var reader = new window.FileReader()
    reader.onload = function (e) {
      console.log('imported content', e.target.result)
    }
    reader.readAsDataURL(file)
  }

  render () {
    return <div className='import-export'>
      <h1>Import / Export</h1>
      <a class='export-action' href='#' onClick={() => this.download()}>Export to pomodoro.cc.json</a>

      <label for='import'>Import pomodoro.cc.json</label>
      <input ref='editField' onChange={() => this.importFile()} id='import' type='file' placeholder='Import pomodoro.cc.json' />
    </div>
  }
}

export default connect(
(state) => ({
  todos: state.todos,
  settings: state.settings,
  pomodoros: state.pomodoros
}), (dispatch) => ({}))(ImportExport)

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
