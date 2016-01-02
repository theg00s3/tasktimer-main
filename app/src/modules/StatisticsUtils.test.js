import StatisticsUtils from './StatisticsUtils'
describe('StatisticsUtils', () => {
  describe('#pomodoriCount', () => {
    it('for empty data returns 0.0', () => {
      expect( StatisticsUtils.pomodoriCount([]) ).to.eql(0.0)
    })
  })
  describe('#calculateDailyPulseFrom', () => {
    it('for empty data returns empty graph data', () => {
      expect( StatisticsUtils.calculateDailyPulseFrom([]) ).to.eql([])
    })

    it('calculates y coordinates', () => {
      const data = [{minutes:25, started_at:'2015-12-09T21:59:38.172000Z'}]
      const graphData = [{x:0,y:0}]
      expect( StatisticsUtils.calculateDailyPulseFrom(data) ).to.deep.eql( graphData )
    })
  })

  describe('#calculatGenericChartFrom', () => {
    it('for empty data returns empty graph data', () => {
      expect( StatisticsUtils.calculatGenericChartFrom([]) ).to.eql({graph:[], xAxis:[]})
    })
    it.skip('calculates coordinates', () => {
      const data = [{minutes:25, started_at:'2015-12-09T21:59:38.172000Z'}]
      const graphData = {graph:[], xAxis: [1]}
      const actual = StatisticsUtils.calculatGenericChartFrom(data)
      console.log(
        JSON.stringify(actual)
      )
      expect( actual ).to.deep.eql( graphData )
    })
  })
})
