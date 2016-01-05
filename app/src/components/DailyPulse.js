require('./DailyPulse.styl')
import React, {Component, PropTypes} from 'react'
import {VictoryScatter} from 'victory'
import PomodoroService from '../modules/PomodoroService'
import GraphUtils from '../modules/GraphUtils'
const DOMAIN = {x:[0,100],y:[0,25]}

export default class DailyPulse extends Component {
  render() {
    const {data, width} = this.props
    const graphData = GraphUtils.calculateDailyPulseFrom(data)

    return  <div className="daily-pulse">
              <VictoryScatter
                style={{data:{fill:'#AFACAC'}}}
                domain={DOMAIN}
                height={70}
                width={width}
                size={2}
                animate={{velocity: 0.5}}
                data={graphData}/>
            </div>
  }
}
DailyPulse.propTypes = {
  data: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
}
