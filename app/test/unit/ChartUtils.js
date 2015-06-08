var ChartUtils = require('../../src/modules/ChartUtils')

var expect = require('chai').expect

describe('ChartUtils', function () {
  it('gets chart data for pie chart', function () {
    var data = [{
      type: 'pomodoro',
      minutes: 25,
      startedAt: Date.now()
    }]
    var expectedChartData = [{
      value: 25,
      color: '#DF2E2E',
      highlight: '#DF2E2E',
      label: 'Pomodori'
    }, {
      value: 0,
      color: '#24b524',
      highlight: '#24b524',
      label: 'Breaks'
    }]
    var chartData = ChartUtils.getPieChartDataFrom(data)
    expect( chartData ).to.deep.equal(expectedChartData)
  })
})
