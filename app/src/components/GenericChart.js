require('./GenericChart.styl')
import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory'
import {length} from 'ramda'
import StatisticsUtils from '../modules/StatisticsUtils'

export default class GenericChart extends Component {
  render() {
    let {data} = this.props
    data = data || {}
    const graphData = StatisticsUtils.calculatGenericChartFrom(data || {})
    if( length(graphData.graph) < 2 ){
      return  <div className="tac alert alert-black">
                <p>Not enough data</p>
              </div>
    }
    return  <VictoryChart
              height={300}
              width={700}
              domain={{
                y:[0,25]
              }}>
              <VictoryAxis tickValues={graphData.xAxis} tickFormat={StatisticsUtils.formatTimestampToHour}/>
              <VictoryLine
                data={graphData.graph}
                interpolation="step"
                style={{data: {stroke: "grey"}}}/>
              <VictoryLine
                data={graphData.graph}
                interpolation="bundle"
                style={{data: {stroke: "red"}}}/>
            </VictoryChart>
  }
}
GenericChart.propTypes = {
  data: PropTypes.array.isRequired
}
