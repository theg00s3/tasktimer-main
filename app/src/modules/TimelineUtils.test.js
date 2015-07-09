var TimelineUtils = require('./TimelineUtils')

var expect = require('chai').expect

describe('TimelineUtils', function () {
  var data = [{
    startedAt: 1436024075955,
    minutes: 25
  },{
    startedAt: 1436026529814,
    minutes: 5
  },{
    startedAt: 1436026668724,
    cancelledAt: 1436026668724+1000*60*3,
    minutes: 15
  },{
    startedAt: 1436026851193,
    minutes: 25
  },{
    startedAt: 1436032696618,
    minutes: 5
  }]

  it('returns undefined for an empty list', function () {
    expect( TimelineUtils.getStart([]) ).to.eql( undefined )
  })

  it('calculates the start time', function () {
    expect( TimelineUtils.getStart(data) ).to.eql( data[0].startedAt )
  })

  it('calculates the start time in hour format', function () {
    expect( TimelineUtils.getStartHour(data) ).to.eql( '17:00' )
  })
  
  it('calculates the end time', function () {
    expect( TimelineUtils.getEnd(data) ).to.eql( data[data.length-1].startedAt )
  })

  it('calculates the end time in hour format', function () {
    expect( TimelineUtils.getEndHour(data) ).to.eql( '20:00' )
  })

  it('can be used to get the start time from a single item', function () {
    expect( TimelineUtils.getStart(data[0]) ).to.eql( data[0].startedAt )
  })

  it('can be used to get the end time from a single item', function () {
    expect( TimelineUtils.getEnd(data[0]) ).to.eql( data[0].startedAt )
  })

  describe('timeline rendering data', function () {
    it('calculates the horizontal position', function () {
      expect( TimelineUtils.getTimelineItemRenderingData(data[0], data).x ).to.eql( '19.1%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[1], data).x ).to.eql( '41.7%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[2], data).x ).to.eql( '42.98%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[3], data).x ).to.eql( '44.67%' )
      expect( TimelineUtils.getTimelineItemRenderingData(data[4], data).x ).to.eql( '98.49%' )
    })

    it('calculates the radius', function () {
      expect( TimelineUtils.getTimelineItemRenderingData(data[0], data).r ).to.eql( 30.9 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[1], data).r ).to.eql( 13.81 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[2], data).r ).to.eql( 10.7 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[3], data).r ).to.eql( 30.9 )
      expect( TimelineUtils.getTimelineItemRenderingData(data[4], data).r ).to.eql( 13.81 )
    })
  })

})
