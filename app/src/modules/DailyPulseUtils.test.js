import DailyPulseUtils from './DailyPulseUtils'
describe('DailyPulseUtils', () => {
  it('for empty data returns empty graph data', () => {
    expect( DailyPulseUtils.calculateFrom([]) ).to.eql([])
  })

  describe('calculates y coordinates', () => {
    it('single pomodoro', () => {
      const data = [{minutes:25, started_at:'2015-12-09T21:59:38.172000Z'}]
      const graphData = [{x:0,y:0}]
      expect( DailyPulseUtils.calculateFrom(data) ).to.deep.eql( graphData )
    })
    it.skip('multiple pomodoros', () => {
      const data = [{
        minutes:25, started_at:'2015-12-09T21:59:38.172000Z',
      },{
        minutes:25, started_at:'2015-12-09T22:19:38.172000Z',
      }]
      const graphData = [{x:0,y:0}, {x:100,y:0}]
      expect( DailyPulseUtils.calculateFrom(data) ).to.deep.eql( graphData )
    })
  })
})
