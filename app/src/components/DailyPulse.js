require('./DailyPulse.styl')
import React, {Component} from 'react'
import {VictoryScatter} from 'victory'
import PomodoroService from '../modules/PomodoroService'
import NotificationCenter from '../modules/NotificationCenter'
import StatisticsUtils from '../modules/StatisticsUtils'
const DOMAIN = {x:[0,100],y:[0,25]}

export default class DailyPulse extends Component {
  constructor() {
    super()
    this.state = {
      data: undefined
    }
  }
  componentDidMount() {
    NotificationCenter.on('pomodoroEnded', this._delayedFetch.bind(this))
    this._fetch()
  }

  componentWillUnmount() {
    NotificationCenter.off('pomodoroEnded', this._delayedFetch.bind(this))
  }

  _fetch() {
    PomodoroService.today()
    .then((response) => {
      const data = StatisticsUtils.calculateDailyPulseFrom(response.data)
      this.setState({data})
    })
  }

  _delayedFetch() {
    setTimeout(this._fetch.bind(this), 500)
  }

  render() {
    const {data} = this.state
    if( data === undefined ){
      return  null
    }
    return  <div className="daily-pulse">
              <VictoryScatter
                style={{data:{fill:'#AFACAC'}}}
                domain={DOMAIN}
                height={70}
                width={700}
                size={2}
                animate={{velocity: 0.5}}
                data={data}/>
            </div>
  }
}
