import PomodoroStatisticsUtils from './PomodoroStatisticsUtils'
describe('PomodoroStatisticsUtils', () => {
  describe('#calculateDailyPulseFrom', () => {
    it('for empty data returns empty graph data', () => {
      expect( PomodoroStatisticsUtils.calculateDailyPulseFrom([]) ).to.eql([])
    })

    it('calculates y coordinates', () => {
      const data = [{minutes:25, started_at:'2015-12-09T21:59:38.172000Z'}]
      const graphData = [{x:0,y:0}]
      expect( PomodoroStatisticsUtils.calculateDailyPulseFrom(data) ).to.deep.eql( graphData )
    })
  })

  describe('#calculatGenericGraphFrom', () => {
    it('for empty data returns empty graph data', () => {
      expect( PomodoroStatisticsUtils.calculatGenericGraphFrom([]) ).to.eql([])
    })
  })
})
