var ChartUtils = require('../../src/modules/ChartUtils')

var expect = require('chai').expect

describe('ChartUtils', function () {
  it('gets chart data for pie chart', function () {
    var data = [{
      type: 'pomodoro',
      minutes: 25,
      startedAt: Date.now()
    }]
    var chartData = ChartUtils.getPieChartDataFrom(data)
    expect( chartData[0] ).to.be.defined
    expect( chartData[1] ).to.be.defined
    expect( chartData[0].value ).to.equal(25)
    expect( chartData[1].value ).to.equal(0)
  })
})
