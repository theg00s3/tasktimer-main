var Loader = require('react-loader')
var React = require('react')
var axios = require('axios')

module.exports = function(context){
  var day = '02/06/2015'
  var dataPromise = axios.get('/api/pomodoro',{
    params: {
      day: day
    }
  })
  React.render(<Statistics dataPromise={dataPromise}></Statistics>, document.querySelector('main'))
}


var Statistics = React.createClass({
  getInitialState: function(){
    return {
      data: null,
      loaded: false
    }
  },
  componentDidMount: function(){
    this.props.dataPromise
      .then(function(response){
        setTimeout(function(){
          this.setState({
            data: response.data,
            loaded: true
          })
        }.bind(this), 500)
      }.bind(this))
  },
  render: function(){
    var data = this.state.data || []

    var debugData = data.map(function(dat){
      return  <li>
                {dat.minutes} - {dat.type} - {dat.startedAt}
              </li>
    })

    return  <Loader loaded={this.state.loaded}>
              <div className="content">
                <h1 className="tac">Statistics</h1>
                <ul>
                  {debugData}
                </ul>
              </div>
            </Loader>
  }
})
