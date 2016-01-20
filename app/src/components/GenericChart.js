require('./GenericChart.styl')
import React, {Component, PropTypes} from 'react'
import {VictoryChart, VictoryAxis, VictoryLine} from 'victory'
import {length} from 'ramda'
import GraphUtils from '../modules/GraphUtils'

export default class GenericChart extends Component {
  render() {
    let {data} = this.props
    data = data || {}
    const graphData = GraphUtils.calculatGenericChartFrom(data || {})
    return  <VictoryChart
              height={300}
              width={1200}
              domain={{
                y:[0,25]
              }}>
              <VictoryAxis tickValues={graphData.xAxis} tickFormat={GraphUtils.formatTimestampToHour}/>
              <VictoryLine
                data={graphData.graph}
                interpolation="stepAfter"
                style={{data: {stroke: "grey"}}}/>
            </VictoryChart>
  }
}
GenericChart.propTypes = {
  data: PropTypes.array.isRequired
}
