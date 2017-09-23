import GraphUtils from './GraphUtils'
const MINUTES = 1000 * 60
const sample = [{
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:30:00.000Z'
}, {
  type: 'pomodoro',
  minutes: 25,
  started_at: '2016-01-03T21:55:00.000Z',
  cancelled_at: '2016-01-03T22:05:00.000Z',
}]

describe('GraphUtils', () => {
  describe('#calculatGenericChartFrom', () => {
    const graphData = {
      "graph":[{"x":1451856600000,"y":0},{"x":1451856600000,"y":25},{"x":1451858100000,"y":0},{"x":1451858100000,"y":10},{"x":1451858700000,"y":0},{"x":1451858700000,"y":0}],
      "xAxis":[1451851200000,1451854800000,1451854800000,1451858400000]
    }
    it('for empty data returns empty graph data', () => {
      expect( GraphUtils.calculatGenericChartFrom([]) ).to.eql({graph:[], xAxis:[]})
    })
    it('calculates coordinates', () => {
      const actual = GraphUtils.calculatGenericChartFrom(sample)
      expect( graphData ).to.deep.eql( actual )
    })
  })
})
